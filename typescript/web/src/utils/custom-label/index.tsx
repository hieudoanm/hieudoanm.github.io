export const customLabel =
  (data: { name: string; value: number }[], total: number) =>
  // eslint-disable-next-line react/display-name
  ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    value: number;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = ((value / total) * 100).toFixed(2);
    return (
      <text
        x={x}
        y={y}
        fill='#111111'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'>
        {data[index].name} ({percentage}%)
      </text>
    );
  };
