import { describe, expect, it } from 'vitest';
import nerdamer from 'nerdamer-prime';
import 'nerdamer-prime/Algebra';
import 'nerdamer-prime/Solve';
import transferTime, { validateTransferTimeInput } from './transferTime';

describe('transfer time calculator', () => {
  it('calculates eight seconds for one GB at one Gbps', () => {
    let result: nerdamer.NerdamerExpression | nerdamer.NerdamerExpression[] =
      nerdamer(transferTime.formula)
        .sub('fileSize', '1000000000')
        .sub('transferSpeed', '1000000000').solveFor!('time');

    if (Array.isArray(result)) result = result[0];

    expect((result as nerdamer.NerdamerExpression).evaluate().toDecimal()).toBe(
      '8'
    );
  });

  it('rejects missing, zero, and negative inputs', () => {
    expect(
      validateTransferTimeInput({
        fileSize: { value: NaN, unit: 'B' },
        transferSpeed: { value: 1, unit: 'bps' }
      })
    ).toBeDefined();
    expect(
      validateTransferTimeInput({
        fileSize: { value: 0, unit: 'B' },
        transferSpeed: { value: 1, unit: 'bps' }
      })
    ).toBeDefined();
    expect(
      validateTransferTimeInput({
        fileSize: { value: 1, unit: 'B' },
        transferSpeed: { value: -1, unit: 'bps' }
      })
    ).toBeDefined();
    expect(
      validateTransferTimeInput({
        fileSize: { value: 1, unit: 'B' },
        transferSpeed: { value: 1, unit: 'bps' }
      })
    ).toBeUndefined();
  });
});
