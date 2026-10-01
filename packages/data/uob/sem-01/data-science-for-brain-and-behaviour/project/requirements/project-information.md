# Data Science Project

## Assessment Details: Data Science for Brain and Behaviour 1

> **By submitting work you agree that this assignment submission is your own, original work.**

---

## Data Science Project

The project asks you to identify a question you and your team are interested in. Find a publicly available dataset that allows you to answer your question.

You should:

1. Visualize and describe the raw data.
2. Do appropriate data cleaning and summarization.
3. Run at least one analysis based on code, not a "black box" analysis.
4. Use techniques from the course. Simpler and well-understood can be better than complex and poorly understood.
5. Use **at least one permutation analysis**.
6. Visualize the outcomes of your analysis.
7. Draw appropriate conclusions.

> **Use only techniques from the course unless you can provide a clear justification for what you are doing.**

If you use methods for programming or analysis that we do not cover in the course, but we have provided a way to do the same thing in the course materials, we will assume that you do not really know what you are doing and are probably copying material that you do not understand from an internet or AI source. This can attract a heavy penalty.

We can also ask you to come in and explain what you were doing. If you cannot explain your code, we will assume you do not know what it is doing and may not have been the author. We do not have to prove authorship.

The assessment is based on evidence of **your** understanding.

If you use a technique that we do not cover in the course, but your explanation is a generic one of the sort that an AI produces, we may assume you do not know what this technique actually does. Your explanation must be specific and related to the question you have set for the project.

The point of this project is not to produce code that runs. There are other people, AIs, or internet pages that can provide code that runs. There is nothing new about this. There have always been experts who are better than learners.

The question is whether **you**, as a learner, understand your code and analysis, not whether there is someone or something else that can produce code or analysis.

> **It is about your understanding of the process, not about the product.**

---

# Project Teams

- Teams of size **3 or 4** are expected.
- A slightly smaller or larger team is possible. If in doubt, talk to the instructor.
- See below for data rules.
- When you have a team you are happy with, choose one member to email Andrew with the required information.

The instructor will consider smaller or slightly larger team sizes, but your email should give convincing justification.

In particular, you need to convince the instructor that:

- You have done the best you can to form a larger team if you want a smaller team.
- You have enough work to justify additional people if you want a larger team.

---

## Team Request

Email Andrew at [a.c.olson@bham.ac.uk](mailto:a.c.olson@bham.ac.uk) with your request to form a team.

One team member should send the email, with the other members included in CC.

Your email should contain:

- A list of the team members.
- A link to the data you are going to use.
  - You must point to some initial data.
  - If the data is not public, give the instructor some way to verify that it exists and is suitable.
  - **Do not use datasets from Kaggle, datasets that originated on Kaggle, or datasets that appear on Kaggle.**
  - It is your responsibility to know the ultimate source of your data.
  - There should be a real published source that you can point to.

- A description of the question you hope to answer.
  - Be as specific as possible.
  - You can list the analysis you plan to use if you want.

See the section **"Describing data..."** on the project data page for more details on how to describe your data and what you want to do with it.

List your topic(s) in the project topics spreadsheet on the course home page.

---

## Project Resources

- **Project format:** See more information here — TBA.
- **Data:** See [Information About Data for Projects](https://canvas.bham.ac.uk/courses/88162/pages/project-data) (**do not use Kaggle data**).
- **Project rubric:** See the [Project Question and Rubric](https://canvas.bham.ac.uk/courses/88162/pages/project-question-and-rubric).

---

# Workload

This course is worth **20 credits**, and each credit assumes 10 hours of work according to University guidelines.

Unlike other courses, there is no exam to revise for. Therefore, the time that is not taken by lectures, workshops, and homework assignments is for the project.

**200 hours is approximately 5 weeks of full-time work.**

You may find that at the beginning of the project the amount of work seems daunting. Please do not worry. If you work steadily, you will find things fall into place.

On the other hand, you must plan to work steadily.

A former student gave the following advice when asked:

> Unlike most group projects (which last for maybe a few weeks tops or could conceivably be pulled off by one very dedicated person), this one will dominate the entire semester. Try to stay organized for the project and create lots of little goals and checkpoints. You [your group] should always be working on something for the project, whether that's coding, reviewing, writing, etc. Ask lots of questions and ask them early!

---

# Getting Help

The instructors are very happy to help with advice on your project.

They cannot write project code for you, but they will provide advice.

> **Please do not wait to ask for help. If you are stuck, let the instructors know as soon as possible.**

Remember the Piazza Q&A board and use it.

---

# Scope

Make sure you formulate an **explicit question about the data**.

## Example of an Explicit Question

> "Is the BRAC1 gene associated with worse breast cancer outcomes?"

However, what do you mean by "worse outcomes"? This needs to be refined.

A more specific question would be:

> "Is the BRAC1 gene associated with more deaths from breast cancer?"

Notice that this is different from measuring whether breast cancer occurs.

The question is:

> Once you have breast cancer, are you more likely to die if you have the BRAC1 gene?

---

## Example of a Vague Question

Do **not** choose a question like:

> "We wanted to know something about what determines breast cancer outcomes."

This might be a good starting point, but you should refine it into a specific question by the end.

---

# Types of Questions

You should pick a question that can be answered using the analyses introduced in the course.

These broadly fall into the following categories.

## Questions About Means

For example, a permutation test could address:

> "Are depression scores lower in female secondary school pupils compared to males?"

This compares mean depression scores between female and male students.

---

## Questions About Counts

For example, a permutation test could address:

> "Are non-white members of the public more likely to be subject to arrest after stop-and-search compared to white members of the public?"

This compares the number of non-white and white people who were arrested or not arrested from a sample of people who were subject to stop-and-search.

---

## Questions About Linear Relationships

A question about a linear relationship might be:

> "Are CO₂ emissions related to average temperatures?"

This asks whether high values of one variable are associated with high values of another variable.

A negative relationship is also possible: high values of one variable could be related to low values of another variable. This is still a linear relationship.

In statistical terminology, "linear relationships" do not necessarily mean relationships that are described by a straight line. Roughly, linear relationships mean that predictors — the data being used to predict something — are added to produce the dependent variable.

The relationship between predictors and predicted values can be curved. This is an advanced topic, so if you think it applies to your project, ask the instructor.

---

## Questions About Data With Two Outcomes

For example:

> "Can the occurrence of bowel cancer be predicted from average meat consumption?"

There are only two outcomes for each person: yes or no.

---

If you are interested in a topic but are unsure how to analyze the data, discuss it with the instructors. There is often an approach that can be used within the domain of the course, which may sometimes mean answering a slightly modified question.

The "permutation" part of these examples may not make sense early in the course. You may not yet know what "permutation" means.

Do not worry. This will be covered during the course.

The examples are provided because the instructors want you to choose:

1. A topic you are interested in.
2. A topic that can be addressed using the techniques you learn during the term.

---

# Analysis Techniques

> **We only expect you to use the techniques that we have shown you in the lectures.**

You should not use techniques that you do not understand.

You should perform simple, clear analyses with basic techniques using coding methods learned in the course rather than complex analyses or different coding techniques that are not covered in the course.

Your job as a data scientist is to draw clear conclusions from data.

This involves:

- Selecting data.
- Cleaning data.
- Wrangling data.
- Plotting relevant results.
- Performing analysis.
- Making an argument about what the results mean based on the visualizations and analyses.

That is already a significant part of the project.

> **If you are tempted to use complex analysis techniques: do not.**

If you understand complex techniques, you can also do a good job with simple ones. If you do not understand either, you might present a technique that you have not covered and do not understand.

> **DO NOT present analyses using techniques we have NOT covered in the course.**

That would be work for a different course.

If in doubt, talk to Andrew.

---

# Marking Criteria

See the [full marking rubric](https://canvas.bham.ac.uk/courses/88162/pages/project-question-and-rubric).

In summary, the project is marked for:

- Clarity
- Depth
- Validity
- Reproducibility

Each member of the project must also submit a separate individual reflective statement. See the description under the separate assignment.

---

# Suggested Structure

See the rubric for the requirements of your project files.

If you have done special things with libraries or anything else, leave instructions about how to reproduce your analysis.

---

# Reproducibility

The project should be fully reproducible.

We recommend that you:

- Download the data you are working with.
- Save the data with your project files.
- Leave instructions explaining how the instructors can find and download the original data.
- Start your code from the downloaded data.
- End your code with the analysis.

Sometimes students are tempted to process downloaded data manually before starting their analysis.

> If you want to do this, talk to the instructor first.

The instructors will assume that they can download your data from its original source and run your analysis from start to finish in the Jupyter notebook.

> **That is what a reproducible analysis is about.**

---

# Process

In summary:

- Analysis and collaboration will be public.
- Your analysis should be reproducible.
- The final submission should include:
  - The data, unless the file is too large.
  - A link to the data if the file is too large.
  - Your Jupyter notebook.
  - The Word document containing your project report.

- You should submit a `.zip` file containing the project.

See **"Submitting the Project"** below.

---

# Plagiarism and ChatGPT / AI / Internet Sources

See the [plagiarism rules](https://canvas.bham.ac.uk/courses/88162/pages/project-plagiarism).

See the guidance on [using AI/ChatGPT and other internet sources](https://canvas.bham.ac.uk/courses/88162/pages/using-ai-slash-chatgpt-and-other-internet-sources).

---

# Using Python Libraries

You can use any part of the following libraries without further explanation:

- NumPy
- Pandas
- Matplotlib

If you use other libraries, you should explain in your write-up why you are using the library rather than building the analysis yourself.

You must persuade the instructors, in your write-up, that you fully understand the analysis you are using.

If in doubt, speak to Andrew or one of the TAs.

> If the instructors do not think you understand routines from a library, they will apply a penalty.

---

# Submission

## Required Files

Include a `project_members.txt` file in your project folder listing the student ID numbers of all members of your project team.

Your submission should contain:

- Project data.
- Jupyter notebook containing all code.
- Word document containing the project report.
- `project_members.txt`.

Download the project folder as a `.zip` file and submit it to Canvas.

Use the same process that you use for submitting notebooks, but download the **whole project folder**, not just the `.ipynb` file.

Step-by-step instructions will be provided closer to the submission date.

If the `.zip` file is too large, an alternative submission method will be arranged.

### Group Submission

Each person in the group should submit an **identical project file** on Canvas.

This is done for administrative purposes, including keeping track of who has submitted and identifying group members.

### File Naming

Label your document:

```text
<StudentID>_data_science_project.zip
```

For example:

```text
9746879_data_science_project.zip
```

Remember to also submit the **individual reflective statement** via Canvas.

---

# Previous and/or Possible Topics

There are two important considerations when choosing a topic.

## 1. What Is the Question You Are Interested In?

The most important consideration is:

> **What is a question you are interested in?**

When you are genuinely interested in finding answers, you look at data differently. Usually, you think more about possible outcomes and are more critical about what results might mean.

## 2. Is Appropriate Data Available?

The second consideration is:

> **Are there data available in the public domain that would allow you to answer your question?**

Sometimes you may have a strong interest in a question, but the data necessary to answer it are not available. When this happens, you may need to move down the list of possible questions.

---

# Example Topics

Previous versions of this class have included, or could have included, topics such as:

- An analysis of UK and European public data on immigration to assess whether the UK government was, despite assurances, continuing to deport residents from the West Indies who had settled in the UK legally before 1973.
- Looking for a link between UK school performance and local pollution data.
- Trying to relate Birmingham voting patterns to local levels of homelessness. Do people in areas with more homelessness tend to vote Conservative, Labour, or Liberal Democrat?
- Global environmental and demographic factors associated with inflammatory bowel disease.
- Attempting to work out, using data, the algorithm that YouTube uses when recommending videos.
- Using historical data to predict future National Football League performance of a successful college American football player.
- Predicting future stock prices using historical stock price data.
- Analyzing public NASA data to identify nearby habitable planets.
- Analysis of train timetable and departure/arrival data for evidence of poor performance of particular train companies or lines.
- Looking at largely male work-related deaths now and in the past and investigating whether we are doing better than we used to. Is this related to organizations that represent workers, such as unions?
- Investigating whether there is evidence that mental health issues have increased as a result of COVID.
- Investigating whether there is evidence that use of some social media platforms is more harmful than others.
- Investigating whether climate impacts, such as extreme weather and fires, are increasing at the same rate as the climate is changing — faster, slower, or differently across regions.

---

# Example Project

To give you some idea of what a project looks like, here is a project from a more elementary version of this module:

[Team Windrush](https://github.com/matthew-brett/team-windrush)

The team members kindly gave permission for this project to be shared publicly.

> **IMPORTANT:** Your projects will need to include more analysis than this example.

The example examined and characterized data quite thoroughly, but did not perform an analysis. It contains suggestions about what the team _might_ have done at the end.

Open `READ_ME_PROJECT_SUBMISSION.ipynb` to see the notebook.
