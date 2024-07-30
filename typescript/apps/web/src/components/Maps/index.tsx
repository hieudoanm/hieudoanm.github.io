import { useTheme } from '@web/context/ThemeContext';
import { useEffectOnce } from '@web/hooks/use-effect-once';
import { select } from 'd3';
import daisyuiColors from 'daisyui/src/theming/themes';
import { FC } from 'react';

type Path = {
  d: string;
  id: string;
  title: string;
};

type SVG = {
  viewBox?: string;
  width?: string;
  height?: string;
  paths?: Path[];
};

type Data = { id: string; label: string; value: number; color: string };

type MapsProperties = {
  id?: string;
  svg?: SVG;
  data?: Data[];
};

const drawChart = (
  id: string,
  svgProps: SVG,
  data: Data[],
  chartColor: string
): void => {
  const tooltip = select('body')
    .append('div')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('padding', '8px 16px')
    .style('border-radius', '8px')
    .style('background', chartColor)
    .text('');

  const svg = select(`svg#${id}`);
  svg
    .append('g')
    .selectAll('path')
    .data(svgProps.paths ?? [])
    .enter()
    .append('path')
    .attr('d', (path: Path) => path.d)
    .style('id', (path: Path) => path.id)
    .attr('title', (path: Path) => path.title)
    .attr('fill', (path: Path) => {
      const item = data.find(({ id: itemId }) => path.id === itemId);
      return item?.color ?? '#E6FFFA';
    })
    .attr('stroke', '#ffffff')
    .attr('class', 'svg-path')
    .style('cursor', 'pointer')
    .on('mouseover', (_event: MouseEvent, path: Path) => {
      const item: Data | undefined = data.find(
        ({ id: itemId }) => path.id === itemId
      );
      const text: string = `${item?.label ?? 'Country'}: ${
        item?.value ?? 'N/A'
      }`;
      tooltip.text(text);
      return tooltip.style('visibility', 'visible');
    })
    .on('mousemove', (event: MouseEvent) => {
      return tooltip
        .style('top', `${event.pageY}px`)
        .style('left', `${event.pageX}px`);
    })
    .on('mouseout', () => {
      return tooltip.style('visibility', 'hidden');
    });
};

export const SVGMaps: FC<MapsProperties> = ({
  id = '',
  svg = { viewBox: '', width: '0', height: '0', paths: [] },
  data = [],
}) => {
  const { theme } = useTheme();

  const chartColor = daisyuiColors[theme]['primary'];

  useEffectOnce(() => {
    drawChart(id, svg, data, chartColor);
  });

  return (
    <div id={`${id}-container`}>
      <svg
        id={id}
        viewBox={`0 0 ${svg.width} ${svg.height}`}
        className='mx-auto overflow-hidden'
      />
    </div>
  );
};
