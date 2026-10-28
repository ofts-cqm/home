---
route: /work
label: WorkExperience.md
order: 20
---

# My Work Experience

:::: columns flex="3 7"
::: column
![Ascendance Foundry](../pictures/ascendance.jpeg)
:::

::: column
My first co-op term was at [Ascendance Foundry](https://www.ascendancefoundry.com).

Ascendance Foundry is a consulting firm that brings automation to various industries. It sends "Forward Deployed Engineers" to clients to help them integrate AI into their existing workflows and boost productivity.

As agentic coding becomes more widespread, it significantly reduces the cost of custom software, making it affordable for small companies.

AI can produce a working first version of software, but making it maintainable and scalable requires developer discipline and oversight. Someone still needs to understand the codebase and its architecture because AI can make mistakes.

:::
::::

At Ascendance Foundry, I worked with a private equity firm to automate its accounting processes. By connecting platforms in its Microsoft stack, I automated **payroll processing**, **expense recharging**, **financial statement generation**, and **deal transaction management**.

With the help of AI and knowledge gained at university and through personal projects, I reduced processes that used to take a few days to a single click while significantly reducing bookkeeping errors. Manual errors can accumulate: even if you do a journal 95% of the time correct, well, the chance that all 29 entries in a month's deal are correct is about 0.95^29 = 22.6%. In the automated workflow, data are computed deterministically from configured tables and validated against a set of rules, which largely eliminates the inconsistency and risks created by manual calculation.

## What did I design or implement? Which systems did I connect?

The company I worked with used QuickBooks for its accounting records. However, most of its data were still stored and calculated in Excel, gathered manually from various platforms, and transferred manually to QuickBooks.

My integrations connected QuickBooks, Excel, Teams, and Outlook. QuickBooks remained the accounting system; Excel held source data, temporary data, and some calculations; Teams sent automated approval requests for each journal entry; and Outlook handled notifications and information gathering.

Various Azure services established and maintained these connections. For example, Azure Functions ran event-triggered code, and Azure Key Vault stored credentials. Python and Office Scripts handled local data and batch file processing in the automated data pipeline. I also used Power Automate for simple integrations and Power Apps for data visualization.

I also implemented AI automations, such as an email chatbot for employee time tracking and business analytics. After all, an FDE's main responsibility is to bring AI into different industries.

Building a new integrated platform might sound like a better option, but given that I had only four months, connecting the existing platforms was more feasible. Change management was another factor. The company was familiar with its Excel-based workflow and had created many useful templates. Transferring them would have required new validation and introduced potential errors. The question was how to replace manual Excel steps. By integrating Excel, the company could keep using its templates while automating most data transformation and validation.

## How did we validate the results?

We validated the results together. The accounting team gave me past journal entries and source data; I ran the automation on that historical data and compared the results. We validated changes in a sandbox environment before moving them to production to protect the accounting records. In weekly meetings, we reviewed the process, demonstrated the automation, gathered feedback, and checked results against historical records. A power user also reviewed the workflows to make sure they were comfortable with the new system and willing to adopt it.
