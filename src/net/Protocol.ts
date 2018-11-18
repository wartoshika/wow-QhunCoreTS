export declare type ProtocolHeaderDivider = ",";
export declare type ProtocolHeaderBodyDivider = ":";

export interface Protocol {

    /**
     * the current frame number (as part of multiple packages per complete dataset)
     */
    currentFrame: number;

    /**
     * the length of the identifier
     */
    identifierLength: number;

    /**
     * the length of the data
     */
    dataLength: number;

    /**
     * the identifier used to send the package over the network
     */
    identifier: string;

    /**
     * the data that should be send
     */
    data: string;
}
