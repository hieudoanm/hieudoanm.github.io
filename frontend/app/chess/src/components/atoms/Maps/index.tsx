import { useEffectOnce } from '@chess/common/hooks/use-effect-once';
import { select } from 'd3';

type Path = {
  d: string;
  id: string;
  title: string;
};

type MapsProperties = {
  viewBox?: string;
  width: string;
  height: string;
  paths: Path[];
};

type Data = { id: string; label: string; value: number; color: string };

type SVGMapsProperties = {
  id?: string;
  maps?: MapsProperties;
  data?: Data[];
  onClick?: (id: string) => void;
};

const drawChart = (
  id: string,
  maps: MapsProperties,
  data: Data[],
  onClick: (id: string) => void
): void => {
  const tooltip = select('body')
    .append('div')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('padding', '8px 16px')
    .style('border', '1px solid #fefefe')
    .style('border-radius', '8px')
    .style('background', '#ffffff')
    .text('');

  const svg = select(`svg#${id}`);
  svg
    .append('g')
    .selectAll('path')
    .data(maps.paths)
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
    .on('click', (_event: MouseEvent, path: Path) => {
      onClick(path.id);
    })
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
        .style('top', event.pageY + 'px')
        .style('left', event.pageX + 'px');
    })
    .on('mouseout', () => {
      return tooltip.style('visibility', 'hidden');
    });
};

export const SVGMaps: React.FC<SVGMapsProperties> = ({
  id = '',
  maps = { viewBox: '', width: '0', height: '0', paths: [] },
  data = [],
  onClick = () => {},
}) => {
  useEffectOnce(() => {
    drawChart(id, maps, data, onClick);
  });

  return (
    <div id={`${id}-container`}>
      <svg
        id={id}
        viewBox={`0 0 ${maps.width} ${maps.height}`}
        className="mx-auto overflow-hidden"
      />
    </div>
  );
};
