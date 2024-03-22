import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Bookmark } from '../../../icons/Bookmark';
import { Check } from '../../../icons/Check';
import { Exclamation } from '../../../icons/Exclamation';
import { Sparkle } from '../../../icons/Sparkle';
import { Thunder } from '../../../icons/Thunder';
import { Warn } from '../../../icons/Warn';
import './styles.css';

type ToastType = 'default' | 'success' | 'error' | 'warn' | 'info' | 'magic';
type ToastAnimationType = 'width' | 'fromTop';

interface Props {
  children: React.ReactNode;
  type?: ToastType;
  hideIcon?: boolean;
  open?: boolean;
  autoHideDuration?: number;
  animationType?: ToastAnimationType;
}

/**
 * [data-type=error] {
	--color: oklch(62.8% 0.25 29.23);
	--color: red;
}
[data-type=ai] {
	--color: oklch(58.11% 0.31 307.02);
}
[data-type=tip] {
	--color: oklch(53.24% 0.23 256.22);
}
[data-type=warning] {
	--color: oklch(61.47% 0.16 64.21);
}
[data-type=success] {
	--color: oklch(47.06% 0.17 148.76);
	--color: hsl(145 100% 25%);
}
[data-type=note] {
	--color: oklch(41.84% 0 0);
}
 */

const colors: {
  [k in ToastType]: { color: string; background: string; borderColor: string };
} = {
  default: {
    color: 'oklch(from oklch(41.84% 0 0) calc(l * 1) c h)',
    background: 'oklch(from oklch(41.84% 0 0) calc(l * 1) c h / 20%)',
    borderColor: 'oklch(from oklch(41.84% 0 0) l c h / 25%)'
  },
  success: {
    borderColor: 'oklch(from hsl(145 100% 25%) l c h / 25%)',
    background: 'oklch(from hsl(145 100% 25%) calc(l * 1) c h / 20%)',
    color: 'oklch(from hsl(145 100% 25%) calc(l * 1) c h)'
  },
  error: {
    color: 'oklch(from red calc(l * 1) c h)',
    background: 'oklch(from red calc(l * 1) c h / 20%)',
    borderColor: 'oklch(from red l c h / 25%)'
  },
  warn: {
    borderColor: 'oklch(from oklch(61.47% 0.16 64.21) l c h / 25%)',
    background: 'oklch(from oklch(61.47% 0.16 64.21) calc(l * 1) c h / 20%)',
    color: 'oklch(from oklch(61.47% 0.16 64.21) calc(l * 1) c h)'
  },
  info: {
    borderColor: 'oklch(from oklch(53.24% 0.23 256.22) l c h / 25%)',
    background: 'oklch(from oklch(53.24% 0.23 256.22) calc(l * 1) c h / 20%)',
    color: 'oklch(from oklch(53.24% 0.23 256.22) calc(l * 1) c h)'
  },
  magic: {
    borderColor: 'oklch(from oklch(58.11% 0.31 307.02) l c h / 25%)',
    background: 'oklch(from oklch(58.11% 0.31 307.02) calc(l * 1) c h / 20%)',
    color: 'oklch(from oklch(58.11% 0.31 307.02) calc(l * 1) c h)'
  }
};

const icons: { [k in ToastType]: React.ReactNode } = {
  default: <Bookmark />,
  success: <Check />,
  error: <Exclamation />,
  warn: <Warn />,
  info: <Thunder />,
  magic: <Sparkle />
};

export const Toast = ({
  children,
  type = 'default',
  hideIcon,
  open,
  autoHideDuration = 3,
  animationType = 'width'
}: Props) => {
  const controls = useAnimationControls();
  const textControls = useAnimationControls();
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setEnded(false);
  }, [open]);

  const fromTop = {
    hidden: {
      y: '-500%',
      x: '-50%'
      // opacity: 0
    },
    show: {
      y: 0,
      // opacity: 1,
      x: '-50%',
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 700,
        damping: 25
      }
    },
    exit: {
      y: '-500%',
      x: '-50%'
      // opacity: 0
    }
  };

  const fromZeroWidth = {
    hidden: {
      width: 0,
      opacity: 0,
      x: '-50%'
    },
    show: {
      width: 'auto',
      opacity: 1,
      x: '-50%',
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 700,
        damping: 25
      }
    },
    exit: {
      width: 0,
      x: '-50%'
    },
    exitOpacity: {
      // opacity: 0,
      paddingInline: 0,
      borderWidth: 0
    }
  };

  const textVariant = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0
    }
  };

  useEffect(() => {
    if (animationType === 'width') {
      setTimeout(() => {
        // This one is required otherwise the svg wont render after first animation ends
        controls.start('show');
        setTimeout(
          () => textControls.start('show'),
          fromZeroWidth.show.transition.duration * 1000 * 0.5
        );
      }, 100);
    } else {
      textControls.start('show');
      controls.start('show');
    }

    return setTimeout(
      () => {
        if (animationType === 'width') {
          textControls.start('exit');
          const timeToStartWidthZero =
            textVariant.show.transition.duration * 1000 * 0.8;
          // Go to width 0
          setTimeout(() => {
            controls.start('exit');

            setTimeout(
              () => {
                controls.start('exitOpacity');
                setTimeout(
                  () => setEnded(true),
                  fromZeroWidth.show.transition.duration * 1000
                );
              },
              fromZeroWidth.show.transition.duration * 1000 * 0.3
            );
          }, timeToStartWidthZero);
        } else {
          textControls.start('exit');
          controls.start('exit');
          setEnded(true);
        }
      },
      autoHideDuration > 100 ? autoHideDuration : autoHideDuration * 1000
    ) as any;
  }, []);

  return (
    <AnimatePresence>
      {open && !ended && (
        <motion.div
          className="toast"
          variants={animationType === 'width' ? fromZeroWidth : fromTop}
          animate={controls}
          initial="hidden"
          style={{
            ...colors[type]
          }}>
          <motion.div
            variants={textVariant}
            animate={textControls}
            initial="hidden">
            {!hideIcon && icons[type]}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
