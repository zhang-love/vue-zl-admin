/**
 * Package file volume analysis
 */
import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../../utils';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
}
