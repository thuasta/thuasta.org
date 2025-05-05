# 云服务器集群

## 购置

科协云服务器集群具体配置如下：

- 服务提供商：腾讯云
- 云产品名：轻量应用服务器
- 地域：亚太-新加坡（理论上亚太地区任一都行，但需要保持一致）
- 可用区：不限，但建议避免随机分配，全部放置在同一个可用区（如“新加坡三区”）
- 套餐类型：1台锐驰型（作为gateway），剩下都是入门型
- 套餐规格：2核4GB（参考价格锐驰型60元/月，入门型42元/月）
- 应用创建方式：基于操作系统镜像
- 系统镜像：Debian 12.0

## 配置

1. 批量安装Docker

    轻量云-自动化助手-个人命令-选择地域-创建命令，命令内容如下：

    ```bash
    apt-get update
    apt-get install -y ca-certificates curl
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc

    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update

    VERSION_STRING=5:27.3.1-1~debian.12~bookworm
    apt-get install -y docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
    ```

    保证所有云服务器都有完全相同的VERSION_STRING，否则Docker Swarm无法配置成功。

2. 开放端口

    在腾讯云控制台设置：轻量云-防火墙模版-创建模板，规则配置为应用类型ALL、来源全部IPv4地址、策略允许。创建完成后，设置实例防火墙到全部实例。

3. 配置Docker Swarm

    （参考 https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/ ）

    所有机器中，有一台配置为manager，其他配置为worker。这个可以随意指定一台。

    首先在控制台-轻量云-服务器-manager对应的服务器-概要-网络与域名-IPv4-（内）查看到内网IP地址，格式应该是10.x.x.x。然后SSH登陆manager，运行`docker swarm init --advertise-addr 10.x.x.x`（自行替换IP地址）。运行完成后会输出一段`To add a worker to this swarm, run the following comand...`，把这一段命令复制下来。

    然后可以通过自动化助手，或者手动逐个连接worker，运行刚才复制的命令。

    配置完毕后，在manager运行`docker node ls`查看各节点情况。

4. 配置Portainer

    在manager上，运行`curl -L https://downloads.portainer.io/ce-lts/portainer-agent-stack.yml -o portainer-agent-stack.yml`下载部署配置文件，运行`docker stack deploy -c portainer-agent-stack.yml portainer`部署。

    访问任一manager或worker的9443端口（假设IP为1.2.3.4，则访问 https://1.2.3.4:9443 ），浏览器应该会提醒不安全，忽略并继续访问即可。这是初始配置和后续所有管理操作的地址。

    在Swarm里面配置各个node的labels，添加一个`role`label（注意不要和docker swarm自己的role混淆），锐驰型配置为`gateway`，其他的配置为`worker`。

5. 配置DNS记录

    配置cluster.thuasta.org的A记录到每一个worker（重复添加即可），但不建议配置到manager以免被打。以后就可以访问 https://cluster.thuasta.org:9443 来管理了。

## 应用

以下都是对应的`compose.yaml`文件。

### 无效容器、镜像、卷、网络清理

注意image中的版本需要和前面配置中的docker大版本一致。

```yml
services:
  cleaner:
    image: docker:27-cli
    command: |
      sh -c "
        docker container prune -f
        docker network prune -f
        docker volume prune -f
        docker image prune -af
      "
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      mode: global-job
      restart_policy:
        condition: on-failure
```

### Saiblo Worker

```yml
services:
  gateway:
    image: alpine/socat:latest
    command: -d -d tcp-listen:443,fork,reuseaddr tcp-connect:server.saiblo.net:443
    deploy:
      mode: global
      placement:
        constraints:
          - node.labels.role == gateway
      restart_policy:
        condition: any
    networks:
      default:
      internal:
        aliases:
          - api.saiblo.net

  saiblo-worker:
    image: ghcr.io/thuasta/saiblo-worker:0.4.4
    depends_on:
      - gateway
    deploy:
      mode: global
      placement:
        constraints:
          - node.labels.role == worker
      restart_policy:
        condition: any
    environment:
      NAME: saiblo-worker
      
      AGENT_BUILD_TIMEOUT: 300
      AGENT_CPUS: 0.5
      AGENT_MEM_LIMIT: 1g

      GAME_HOST_IMAGE: ghcr.io/thuasta/thuai-8-server:1.0.0
      GAME_HOST_CPUS: 1
      GAME_HOST_MEM_LIMIT: 1.5g

      HTTP_BASE_URL: https://api.saiblo.net
      WEBSOCKET_URL: wss://api.saiblo.net/ws/
      JUDGE_TIMEOUT: 1200
      LOGGING_LEVEL: INFO
    networks:
      internal:
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

networks:
  default:
  internal:
    internal: true
```
