import React, {
  useEffect,
  useRef,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import 'leaflet-rotatedmarker';

interface MyProps extends MarkerProps {
  children: any;
  rotationAngle: number;
  rotationOrigin: any;
}

const RotatedMarker: ForwardRefExoticComponent<
  MyProps & RefAttributes<MarkerProps>
> = forwardRef(
  // eslint-disable-next-line no-shadow
  ({ children, ...props }: MyProps, forwardRef: any) => {
    const markerRef: any = useRef();

    const { rotationAngle, rotationOrigin } = props;
    useEffect(() => {
      const marker: any = markerRef.current;
      if (marker) {
        marker.setRotationAngle(rotationAngle);
        marker.setRotationOrigin(rotationOrigin);
      }
    }, [rotationAngle, rotationOrigin]);

    return (
      <Marker
        ref={(ref) => {
          markerRef.current = ref;
          if (forwardRef) {
            // eslint-disable-next-line no-param-reassign
            forwardRef.current = ref;
          }
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children}
      </Marker>
    );
  }
);

export default RotatedMarker;
