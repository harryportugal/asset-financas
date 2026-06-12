import React, { useEffect, useMemo, useRef } from 'react';
import type { RefObject, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  style?: React.CSSProperties;
  scrollTriggered?: boolean;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  animateTrigger?: boolean;
}

// Helper to recursively walk a ReactNode and wrap individual characters in a span.char with unique keys
function splitReactNode(node: ReactNode, keyPrefix: string = 'sf'): ReactNode {
  if (typeof node === 'string') {
    return node.split('').map((char, index) => {
      const key = `${keyPrefix}-ch-${index}`;
      if (char === ' ') {
        return (
          <span className="char space" key={key}>
            {' '}
          </span>
        );
      }
      return (
        <span className="char" key={key}>
          {char}
        </span>
      );
    });
  }
  if (typeof node === 'number') {
    return splitReactNode(String(node), keyPrefix);
  }
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    const children = element.props.children
      ? React.Children.map(element.props.children, (child, idx) =>
          splitReactNode(child, `${keyPrefix}-${idx}`)
        )
      : undefined;
    return React.cloneElement(element, { key: keyPrefix }, children);
  }
  if (Array.isArray(node)) {
    return React.Children.map(node, (child, idx) =>
      splitReactNode(child, `${keyPrefix}-arr-${idx}`)
    );
  }
  return node;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  style,
  scrollTriggered = true,
  delay = 0,
  as: Component = 'h2',
  animateTrigger
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    return splitReactNode(children);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll('.char');

    if (animateTrigger !== undefined && !animateTrigger) {
      gsap.set(charElements, {
        opacity: 0,
        yPercent: 60,
        scaleY: 1.3,
        scaleX: 0.9,
        transformOrigin: '50% 0%'
      });
      return;
    }

    const animVars: gsap.TweenVars = {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: stagger,
      delay: delay
    };

    if (scrollTriggered) {
      const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
      animVars.scrollTrigger = {
        trigger: el,
        scroller,
        start: scrollStart,
        end: scrollEnd,
        scrub: true
      };
    }

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 60,
        scaleY: 1.3,
        scaleX: 0.9,
        transformOrigin: '50% 0%'
      },
      animVars
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, scrollTriggered, delay, animateTrigger]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component ref={containerRef as any} className={`scroll-float ${containerClassName}`} style={style}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
};

export default ScrollFloat;
