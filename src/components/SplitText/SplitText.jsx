import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

// This component need to be transformed to typescript in the future

const SplitText = ({
text = '',
className = '',
delay = 100,
offset = 0,
animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
easing = 'easeOutCubic',
threshold = 0.1,
rootMargin = '-100px',
textAlign = 'center',
onLetterAnimationComplete = () => {}
}) => {
const letters = text.split('');
const [inView, setInView] = useState(false);
const ref = useRef();
const animatedCount = useRef(0);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(ref.current);

  return () => observer.disconnect();
}, [threshold, rootMargin]);

const springs = useSprings(
  letters.length,
  letters.map((_, i) => ({
    from: animationFrom,
    to: inView
      ? async (next) => {
        await next(animationTo);
        animatedCount.current += 1;
        if (animatedCount.current === letters.length && onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      }
      : animationFrom,
    delay: i * delay + offset,
    config: { easing },
  }))
);

return (
  <p
    ref={ref}
    className={`split-parent ${className}`}
    style={{ textAlign, display: 'inline', overflow: 'hidden' }}
  >
    {springs.map((props, index) => (
      <animated.span
        key={index}
        style={{
          ...props,
          display: 'inline-block',
          willChange: 'transform, opacity',
        }}
      >
        {letters[index] === ' ' ? ' ' : letters[index]}
      </animated.span>
    ))}
  </p>
);
};

export default SplitText;