import { CircularProgress, Container } from '@mui/material';
import React from 'react';

export const Skills: React.FC = () => {
  return (
    <div
      id="skills"
      className="h-full bg-gray-900 bg-cover bg-center bg-no-repeat py-32"
    >
      <Container>
        <div className="text-center">
          <h1 className="mb-8 text-4xl font-bold text-white">Skills</h1>
          <h2 className="mx-auto mb-16 max-w-3xl text-gray-500">
            lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            cupiditate! Molestiae placeat architecto nihil obcaecati illum
            minima incidunt dolores? Officia consectetur optio non totam cum eos
            soluta ipsa et quod.
          </h2>
        </div>
        <div className="relative">
          <div className="absolute -z-10">
            <svg>
              <defs>
                <linearGradient
                  id="CircularProgressGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#b004b0" />
                  <stop offset="100%" stopColor="#38097a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { id: 1, value: 100, name: 'Web Development' },
            { id: 2, value: 75, name: 'Amazon Web Services' },
            { id: 3, value: 50, name: 'Machine Learning' },
          ].map(({ id, value, name }) => {
            return (
              <div key={id} className="col-span-1">
                <div className="relative">
                  <div className="absolute flex h-full w-full items-center justify-center text-2xl text-white">
                    {value}%
                  </div>
                  <CircularProgress
                    variant="determinate"
                    value={value}
                    size={200}
                    className="mx-auto block"
                    sx={{
                      'svg circle': {
                        stroke: 'url(#CircularProgressGradient)',
                      },
                    }}
                  />
                </div>
                <p className="mt-8 text-center text-white">{name}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Skills;
