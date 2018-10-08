import { Injectable } from "../decorators/Injectable";
import { Package } from "./Package";
import { Protocol, ProtocolHeaderDivider, ProtocolHeaderBodyDivider } from "./Protocol";

/**
 * a class that can send data over the network (addon channel).
 */
@Injectable()
export class Network {

    /**
     * the maximum data payload length defined by blizzard
     */
    private readonly maxPayloadLength: number = 250;

    /**
     * the base protocol template
     */
    private readonly protocol: (keyof Protocol | ProtocolHeaderDivider | ProtocolHeaderBodyDivider)[] = [
        "identifierLength", ",", "dataLength", ":", "identifier", "data"
    ];

    private send(channel: WowAddonMessageType, identifier: string, data: string): void {

        // chunk the data in order to use more than 250 chars in one request

    }

    /**
     * chunk the given data into compatible network packages
     * @param identifier the identifier used to transform the data
     * @param data the data to chunk
     */
    private chunkData(identifier: string, data: string): Package[] {

        const payloadLength = ~~this.maxPayloadLength;
        const identifierLength = identifier.length;

        return data.match(`.{1,${payloadLength}`).map(match => {
            return {
                data: {
                    identifierLength: identifierLength,
                    identifier: identifier,
                    dataLength: match.length,
                    data: match
                }
            } as Package;
        });
    }

}