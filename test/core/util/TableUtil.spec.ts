import { TableUtil } from "../../../src/core/util/TableUtil";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite class TableUtilSpec {

    @test "TableUtil.fillTableDefault()"() {

        // simple test
        expect(TableUtil.fillTableDefault({
            boolishValue: true,
            numberValue: 1
        }, {
            stringValue: "test"
        } as any)).to.deep.equal({
            boolishValue: true,
            numberValue: 1,
            stringValue: "test"
        });

        // default table should not override original table field
        expect(TableUtil.fillTableDefault({
            boolishValue: true,
            numberValue: 1
        }, {
            numberValue: 5
        } as any)).to.deep.equal({
            boolishValue: true,
            numberValue: 1
        });

        // if original value is falsey, the default table should be returned
        expect(TableUtil.fillTableDefault(null, {
            default: true
        })).to.deep.equal({
            default: true
        });

        // when both values are falsey, the falsey value is returned
        expect(TableUtil.fillTableDefault(null, false)).to.equal(false);
    }
}