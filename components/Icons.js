const iconProps = {
  viewBox: '0 0 48 48',
  'aria-hidden': true,
  focusable: false,
};

export function HeartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M24 39.2 8.8 24.8C-1.1 15.4 12.7 2 24 13.4 35.3 2 49.1 15.4 39.2 24.8L24 39.2Z" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 22 24 7l18 15v20H29V29H19v13H6V22Zm6 3v11h2V24l10-8.3L34 24v12h2V25L24 15 12 25Z" />
    </svg>
  );
}

export function CommunityIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18 23a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm17-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM5 41v-4.2C5 30.3 10.3 25 16.8 25h2.4C25.7 25 31 30.3 31 36.8V41H5Zm28 0v-4.5c0-3.7-1.2-7.1-3.3-9.8 1.3-.5 2.8-.7 4.3-.7h1.8C41 26 45 30 45 35v6H33Z" />
    </svg>
  );
}

export function TransportIcon() {
  return (
    <svg {...iconProps}>
      <path d="M11 8h26c3.3 0 6 2.7 6 6v20c0 2.2-1.8 4-4 4v4h-5v-4H14v4H9v-4c-2.2 0-4-1.8-4-4V14c0-3.3 2.7-6 6-6Zm0 6v10h26V14H11Zm2 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm22 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

export function LeafIcon() {
  return (
    <svg {...iconProps}>
      <path d="M25 41v-9c-8.2-1-14-6.5-14-14.5 8.6-.8 13.1 3.7 14 8.7V17C25 9.8 30.1 4.2 38 5c.6 8.5-4.5 14.7-13 15.7V41h-4Z" />
    </svg>
  );
}
