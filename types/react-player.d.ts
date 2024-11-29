declare module 'react-player' {
    import { ComponentType } from 'react';
  
    interface ReactPlayerProps {
      url: string;
      controls?: boolean;
      className?: string;
    }
  
    const ReactPlayer: ComponentType<ReactPlayerProps>;
    export default ReactPlayer;
  }
  
  