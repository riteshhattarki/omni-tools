import type { GenericCalcType } from './types';

export const validateTransferTimeInput = (
  variables: Record<string, { value: number; unit: string }>
): string | undefined => {
  const fileSize = variables.fileSize?.value;
  const transferSpeed = variables.transferSpeed?.value;

  if (
    !Number.isFinite(fileSize) ||
    !Number.isFinite(transferSpeed) ||
    fileSize <= 0 ||
    transferSpeed <= 0
  ) {
    return 'File size and transfer speed must both be greater than zero.';
  }

  return undefined;
};

const transferTime: GenericCalcType = {
  icon: 'mdi:timer-transfer',
  keywords: [
    'data',
    'transfer',
    'download',
    'upload',
    'speed',
    'file',
    'time',
    'estimate'
  ],
  path: 'transfer-time',
  formula: 'time = (fileSize * 8) / transferSpeed',
  validate: validateTransferTimeInput,
  extraOutputs: [
    {
      title: 'Minutes',
      formula: 'time / 60',
      unit: 'minute'
    },
    {
      title: 'Hours',
      formula: 'time / 3600',
      unit: 'hour'
    }
  ],
  i18n: {
    name: 'number:transferTime.title',
    description: 'number:transferTime.description',
    shortDescription: 'number:transferTime.shortDescription',
    longDescription: 'number:transferTime.longDescription'
  },
  variables: [
    {
      name: 'fileSize',
      title: 'File Size',
      unit: 'B',
      defaultPrefix: 'M',
      default: 1_000_000,
      solvable: false
    },
    {
      name: 'transferSpeed',
      title: 'Transfer Speed',
      unit: 'bps',
      defaultPrefix: 'M',
      default: 1_000_000,
      solvable: false
    },
    {
      name: 'time',
      title: 'Transfer Time',
      unit: 'second'
    }
  ]
};

export default transferTime;
