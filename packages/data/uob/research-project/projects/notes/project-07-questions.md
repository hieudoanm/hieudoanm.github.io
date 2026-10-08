---
project: 7
supervisor: Howard Bowman - 54
---

# Predicting Recovery from Post-Stroke MRI, using Deep Learning and Explainable AI

## Skip To

- [Predicting Recovery from Post-Stroke MRI, using Deep Learning and Explainable AI](#predicting-recovery-from-post-stroke-mri-using-deep-learning-and-explainable-ai)
  - [Skip To](#skip-to)
  - [Summary](#summary)
  - [Topic](#topic)
  - [Methodology](#methodology)
  - [Questions](#questions)
  - [References](#references)

## Summary

In this project, students will apply interpretable machine learning to MRI data acquired from stroke patients. This work will be with Professor Cathy Price (Wellcome Centre for Human Neuroimaging, University College London), whose ([PLORAS](https://www.ucl.ac.uk/ploras/)) team has collected one of the largest data sets of stroke patients (greater than 1,200), including structural MRI scans, behaviour and demographics ([PLORAS](https://www.ucl.ac.uk/ploras/)). A key focus of Cathy Price’s work is to predict the recovery trajectory of stroke patients from their structural MRI scans, particularly patients with language deficits (i.e. that are aphasic). Progress has been made on this using traditional and now deep learning methods.

Critical to clinical uptake of machine learning in this area is the ability to interpret the predictions it provides in a fashion that can be communicated to clinicians, patients and carers. The project students will work on this topic using methods such as neuro-symbolic techniques. The students will work with Cathy Price’s team at Imaging Neurosciences, UCL.

## Topic

- Stroke
- MRI
- Deep Learning
- Explainable-AI

## Methodology

This project will involve analysis of existing data sets. The analysis is probably most likely to be scripted in Python.

## Questions

1. What would be the main research question for the MSc project?
   - Is the goal primarily to improve prediction of language recovery, or to make existing predictions more interpretable?
2. What MRI data would I actually work with?
   - What types of structural MRI are available, and what behavioural/language measures and demographic variables accompany them?
3. What would I be predicting?
   - A continuous recovery score, a specific language outcome, or something like a patient's recovery trajectory over time?
4. How would deep learning and explainable AI fit together?
   - Would I develop a new predictive model, or take an existing model and investigate/explain its predictions?
5. What does “explainable AI” mean specifically in this project?
   - For example, would I be identifying which brain regions or MRI features contribute to a prediction, or using neuro-symbolic methods to produce more interpretable explanations?
6. How much neuroscience would be involved in interpreting the model?
   - Would we investigate whether the features identified by the model correspond to known language/recovery networks?
7. How much of the existing PLORAS work would I build on?
   - Are there existing preprocessing pipelines, models, code, or published results that I would reproduce and extend?
8. What would make this a strong MSc dissertation rather than simply a machine-learning project?
   - What scientific question would you most like the student to answer?

If you only have 5 questions, Ask 1 → 2 → 4 → 5 → 8

## References

1. Saranti, M., Neville, D., White, A., Rotshtein, P., Hope, T. M., Price, C. J., & Bowman, H. (2025). Predicting language outcome after stroke using machine learning: in search of the big data benefit. NeuroImage: Clinical, 103858.
2. White, A., Saranti, M., Garcez, A. D. A., Hope, T. M., Price, C. J., & Bowman, H. (2024). Predicting recovery following stroke: deep learning, multimodal data and feature selection using explainable AI. NeuroImage: Clinical, 103638.
3. Roohani, Y. H., Sajid, N., Madhyastha, P., Price, C. J., & Hope, T. M. (2018). Predicting language recovery after stroke with convolutional networks on stitched mri. arXiv preprint arXiv:1811.10520.
4. Garcez, A. D. A., Bader, S., Bowman, H., Lamb, L. C., de Penning, L., Illuminoo, B. V., ... & Gerson Zaverucha, C. O. P. P. E. (2022). Neural-symbolic learning and reasoning: A survey and interpretation. Neuro-Symbolic Artificial Intelligence: The State of the Art, 342, 1.
5. Gajardo-Vidal, A., Lorca-Puls, D. L., Team, P., Warner, H., Pshdary, B., Crinion, J. T., ... & Price, C. J. (2021). Damage to Broca’s area does not contribute to long-term speech production outcome after stroke. Brain, 144(3), 817-832.
6. Hosseini, M., Powell, M., Collins, J., Callahan-Flintoft, C., Jones, W., Bowman, H., & Wyble, B. (2020). I tried a bunch of things: The dangers of unexpected overfitting in classification of brain data. Neuroscience & Biobehavioral Reviews, 119, 456-467.
7. Hope, T. M., Friston, K., Price, C. J., Leff, A. P., Rotshtein, P., & Bowman, H. (2019). Recovery after stroke: not so proportional after all? Brain.
