# 摄像头及模型部署

## 摄像头测试

### 硬件要求

- USB 摄像头请在 Orange Pi 启动前插好。
- 扩展板上拨码开关请至于 OFF 状态（ON 状态下表示超声波传感器工作）。

### 系统配置

1. 确保系统已安装必要的驱动和工具

   - 安装摄像头驱动

     ```bash
     sudo modprobe uvcvideo
     ```

   - 安装图形化摄像头测试工具

     ```bash
     sudo apt-get install guvcview
     ```

2. 确保用户有正确的权限

   ```bash
   sudo usermod -a -G video $USER
   ```

   :::warning

   添加用户组后需要重新登录才能生效。

   :::

3. 验证摄像头是否被正确识别

   ```bash
   lsusb
   ls /dev/video*
   ```

### 显示设置

1. 确保已安装并启动 TightVNC

   - 安装 TightVNC（如果尚未安装）

     ```bash
     sudo apt-get install tightvncserver
     ```

   - 启动 VNC 服务

     ```bash
     vncserver :1
     ```

     :::tip

     `:1` 表示启动的 VNC 服务端口，若无法创建，可替换为其他端口号，如 `:1145`。

     :::

2. 连接到 VNC

   - 在本地电脑上使用 VNC Viewer 连接到 Orange Pi。
   - 地址格式：`<香橙派 IP>:1`（若前面使用其他端口号，则替换为相应端口号）。
   - 首次连接需要设置 VNC 密码。

3. 使用图形化工具测试

   :::warning

   此处必须通过 VNC 图形界面运行测试程序，否则将无法显示摄像头画面。

   :::

   在 VNC 界面中运行：

   ```bash
   guvcview
   ```

   如果 guvcview 能正常显示画面，说明摄像头硬件和驱动都正常。

4. 运行测试程序

   输入指令给 `usb_camera_test.py` 赋予所有权限：

   ```bash
   chmod a+x usb_camera_test.py
   ```

   之后在 VNC 界面中运行：

   ```bash
   python usb_camera_test.py
   ```

   :::tip

   若显示未找到 `usb_camera_test.py` 文件或者无法正常运行，可将提供的 `usb_camera_test.py` 文件复制在 `${home}` 目录下，或者覆盖厂商提供的测试原文件后再次尝试。

   :::

<details>
<summary>摄像头未正常工作时的调试方法</summary>

如果摄像头无法正常工作，请按以下步骤进行调试：

1. 使用图形化工具测试

   在 VNC 界面中运行：

   ```bash
   guvcview
   ```

   如果 guvcview 能正常显示画面，说明摄像头硬件和驱动都正常。

2. 安装调试工具

   安装 v4l2-ctl 工具：

   ```bash
   sudo apt-get install v4l-utils
   ```

3. 检查设备权限

   查看设备权限：

   ```bash
   ls -l /dev/video*
   ```

   如果权限不正确，设置正确的权限：

   ```bash
   sudo chmod 666 /dev/video*
   ```

4. 检查用户组

   查看用户组：

   ```bash
   groups
   ```

   如果没有 `video` 组，添加用户组：

   ```bash
   sudo usermod -a -G video $USER
   newgrp video
   ```

5. 检查设备信息

   - 查看设备信息：

     ```bash
     v4l2-ctl --list-devices
     ```

   - 查看特定设备的详细信息：

     ```bash
     v4l2-ctl --device=/dev/video0 --all
     ```

6. 查看系统日志

   查看与摄像头相关的日志：

   ```bash
   dmesg | grep -i "video\camera"
   ```

7. 运行测试程序

   ```bash
   python usb_camera_test.py
   ```

</details>

### 常见问题排查

1. 如果看不到 `/dev/video` 设备
   - 检查 USB 连接。
   - 重新加载 uvcvideo 驱动。
   - 检查 `dmesg` 日志查看详细错误信息。
2. 如果无法打开摄像头
   - 确认权限设置（设备权限应为 666 或 660）。
   - 确认当前用户在 `video` 组中。
   - 检查是否有其他程序占用摄像头。
   - 尝试重启 Orange Pi。
3. 如果打开摄像头但无法读取画面
   - 检查摄像头是否支持设置的分辨率。
   - 尝试降低分辨率（如 640x480）。
   - 检查摄像头是否支持当前的像素格式。

### 测试程序说明

`usb_camera_test.py` 提供以下功能：

- 自动检测系统中的所有视频设备。
- 显示设备权限和参数信息。
- 支持多种视频后端（V4L2/V4L）。
- 显示实时帧率。
- 提供详细的错误信息和调试输出。

:::info

按 `q` 键退出测试程序。

:::

## 部署模型

### 准备工作

1. 确保摄像头已经正确配置并可以工作（参考上述[摄像头调试](#摄像头测试)部分）。

2. 确保已安装 ACLLite 库（参考 [ACLLite 仓库](https://gitee.com/ascend/ACLLite)安装 PyACLLite 库）。

3. 进行源码准备：（以 YoloV5USBCamera 为例）

   - 命令行方式下载（步骤简单，但有时会出现网络问题）：

     ```bash
     cd ${HOME}
     git clone https://gitee.com/ascend/EdgeAndRobotics.git
     ```

   - 下载压缩包方式下载（步骤稍微复杂，但可以避免网络问题）：

     1. 仓右上角选择 `克隆/下载` 下拉框并选择 `下载ZIP`。
     2. 将 zip 包上传到开发板的普通用户家目录中，例如 `${HOME}/EdgeAndRobotics-master.zip`。
     3. 开发环境中，执行以下命令，解压 zip 包并重命名文件夹，便于统一操作：

        ```bash
        cd ${HOME}
        chmod +x EdgeAndRobotics-master.zip
        unzip EdgeAndRobotics-master.zip
        mv EdgeAndRobotics-master EdgeAndRobotics
        ```

     :::tip

     其余文件遇到网络问题也可如此操作。

     :::

### 获取并转换模型

1. 进入 `model` 目录并下载必要文件

   ```bash
   cd ${HOME}/EdgeAndRobotics/Samples/YoloV5USBCamera/model
   wget https://obs-9be7.obs.cn-east-2.myhuaweicloud.com/003_Atc_Models/yolov5s/yolov5s_nms.onnx --no-check-certificate
   wget https://obs-9be7.obs.cn-east-2.myhuaweicloud.com/003_Atc_Models/yolov5s/aipp_rgb.cfg --no-check-certificate
   ```

2. 转换模型

   :::warning

   对于内存小于 8G 的设备，设置以下环境变量：

   ```bash
   export TE_PARALLEL_COMPILER=1
   export MAX_COMPILE_CORE_NUMBER=1
   ```

   :::

   执行模型转换：

   ```bash
   atc --model=yolov5s_nms.onnx --framework=5 --output=yolov5s_rgb --input_shape="images:1,3,640,640;img_info:1,4" --soc_version=Ascend310B4 --insert_op_conf=aipp_rgb.cfg
   ```

3. 运行目标检测程序

   - 进入 `scripts` 目录 `${HOME}/EdgeAndRobotics/Samples/YoloV5USBCamera/python/scripts`：

     ```bash
     cd ../python/scripts
     ```

   - 运行程序：

     ```bash
     bash sample_run.sh
     ```

   :::warning

   - 在 VNC 界面中运行。
   - 注意 OpenCV 版本，应为 OpenCV 而非 OpenCV-headless。

   :::

   :::tip

   若运行失败，使用提供的 `YOLOV5USBCamera.py` 文件替代原有文件后再运行，似乎原文件的文件路径有一点小问题。

   :::

### 常见问题及解决方案

1. 模型文件路径问题

   - 错误信息：`model_path failed, please check.model_path=../model/yolov5s_rgb.om`

     解决方案：确保在正确的目录下运行程序，模型文件应位于 `YOLOV5USBCamera/model/` 目录下。或者使用提供的 `YOLOV5USBCamera.py` 文件替代原有文件，似乎原文件的文件路径有一点小问题。

## 性能优化建议

1. 显示设置
   - 设置合适的摄像头分辨率（建议 640x640）。
   - 确保在 VNC 环境下运行。
   - 根据需要调整显示窗口大小。

## 调试技巧

1. 打印关键信息：

   ```python
   print(f"尝试加载模型: {model_path}")
   print(f"图像形状: {frame.shape}")
   print(f"处理帧率: {fps}")
   ```

2. 检查文件路径：

   ```python
   if not os.path.exists(model_path):
       raise FileNotFoundError(f"模型文件不存在: {model_path}")
   ```

3. 使用 `log_info` 和 `log_error` 记录信息：

   ```python
   from acllite_logger import log_error, log_info
   log_info("开始处理视频流")
   log_error("处理失败")
   ```

4. 按 `q` 键可以随时退出程序。
