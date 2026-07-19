---
project: 50
supervisor: Anna Kowalczyk - 46
---

# Developing a Python Toolkit for Realistic Simulation and Optimisation of OPM-MEG Sensor Arrays

## Skip To

- [Developing a Python Toolkit for Realistic Simulation and Optimisation of OPM-MEG Sensor Arrays](#developing-a-python-toolkit-for-realistic-simulation-and-optimisation-of-opm-meg-sensor-arrays)
  - [Skip To](#skip-to)
  - [Summary](#summary)
  - [Topic](#topic)
  - [Methodology](#methodology)
  - [Questions](#questions)
  - [References](#references)

## Summary

Optically Pumped Magnetometers (OPMs) enable flexible magnetoencephalography (MEG) sensor arrays that can be tailored to specific research questions and participant populations. Building on our previously developed simulation framework for evaluating OPM array performance (see ref [1]), this project will adapt the existing toolkit to Python and extend its capabilities to support modern OPM technologies and realistic measurement conditions. Possible developments include support for triaxial sensors, incorporation of realistic sensor sensitivity and sensing-volume models, and implementation of simulation approaches proposed in recent OPM-MEG modelling studies. The resulting software will enable researchers to investigate how factors such as sensor sensitivity, sensing volume, brain noise, and array geometry influence source localisation accuracy and reconstruction performance under realistic experimental conditions.

The project may also explore sensor array designs for different applications and populations, including custom research arrays, paediatric systems, and infant-focused configurations. Depending on progress and the student's interests, outcomes may include development of a user-friendly interface, benchmark simulations of existing array designs, and recommendations for future OPM-MEG hardware development.

This project combines computational neuroscience, scientific software development, and MEG modelling, providing opportunities to gain experience in Python programming, numerical simulations, source modelling, and collaborative software development using GitHub.

## Topic

- OPM-MEG
- MEG simulations
- Computational Neuroscience
- Sensor Array Optimisation

## Methodology

- Computational modelling
- Python software development
- Forward modelling
- Git/GitHub collaborative development

## Questions

1. What is the main research question you would like the MSc student to answer?
   - Is the primary goal to build the Python toolkit, or to use the toolkit to investigate a scientific question about OPM-MEG sensor arrays?
2. How much of the existing simulation framework already exists?
   - What would I be starting with, and how much of the project would involve porting existing functionality from the current framework to Python versus developing new functionality?
3. Which extensions are the highest priority?
   - For example, triaxial sensors, realistic sensor sensitivity/sensing volumes, brain noise, or new simulation methods?
   - Would I choose one of these, or would you expect me to implement several?
4. What would the scientific evaluation of the toolkit look like?
   - For example, would I benchmark different sensor-array geometries and measure their effect on source localisation accuracy or source reconstruction?
5. How realistic are the simulations expected to be?
   - Would we use realistic head models, anatomical data, sensor noise, and actual OPM sensor characteristics?
6. What would “sensor array optimisation” mean in this project?
   - Would I systematically search for an optimal sensor placement/configuration, or mainly compare existing/custom array designs?
7. How much software engineering versus computational neuroscience would the project involve?
   - Roughly, would you expect the dissertation to be more about building a reusable Python package or about using simulations to answer a neuroscience/MEG question?
8. What would be a realistic MSc-sized outcome?
   - If I wanted to produce something both scientifically meaningful and reusable by the lab, what would you consider a successful final result?

If you only have 5 minutes, Ask #1 → #2 → #4 → #6 → #8.

## References

- [1](https://www.sciencedirect.com/science/article/pii/S1053811922008680?via%3Dihub)
- [2](https://iopscience.iop.org/article/10.1088/0953-2048/15/9/201)
- [3](https://www.sciencedirect.com/science/article/pii/S105381192300099X?via%3Dihub)
- [4](https://www.sciencedirect.com/science/article/pii/S1053811921003025)
