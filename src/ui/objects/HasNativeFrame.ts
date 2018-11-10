/**
 * an interface that indicates that the implementing object has a native wow frame
 */
export interface HasNativeFrame {

    /**
     * get the native wow frame object
     */
    getNativeFrame(): WowFrame;

    /**
     * get the width of the native frame
     */
    getWidth?(): number;

    /**
     * get the height of the native frame
     */
    getHeight?(): number;
}