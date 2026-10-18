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
My first and only work experience is [Ascendance Foundry](https://www.ascendancefoundry.com).

Ascendance Foundry is a consulting firm that brings automation to various industries. Ascendance Foundry sends "Forward Deployed Engineers" to various industries to help them integrate AI into their existing workflows and boost productivity. 

Now, as agentic coding becomes more widespread, it significantly reduces the cost of customized software, making it affordable for small companies. 

However, AI is an expert at building softwares that works once, buut it requires developers' disciplines and managements to build maintainable and scalable software for future updates and scaling. You need a person who can understand the codebase, the architecture, as AI can make mistakes. 

:::
::::

In Ascendance Foundry, I worked for a private equity firm to automate their accounting process. Utilizing their Microsoft stack, by connecting to different platforms, I was able to automate processes including but not limited to **payroll processing**, **expense recharging**, **financial statement generation**, and **managing deal transactions**. 

With the help of AI, plus my knowledge learned from University and my personal projects, I am able to compress these processes that used to take a few days down to just one click, while significantly reducing the bookkeeper error rate. This is because humans' errors compound. Even if you can do 95% of your journals correctly, well, a month's deal contains 29 journals to post, which brings the possibility down to 0.95^29 = 22.5%. With the accounting automation, because data are all computed from well-configured tables and are automatically validated based on a rule set, that brings the error rate down to zero. 

## What you personally designed or implemented? Which systems you connected?

The company I worked for uses QuickBooks as their accounting book. However, most of their data were still stored and calculated in Excel; they were manually gathered from scattered platforms and manually transferred to QuickBooks. 

My integrations were usually between QuickBooks, Excels, Teams, and Outlook, where QuickBooks still used as accounting book, Excel for sources, temperory storage, and some calculations; then Teams was used to send out automated approval requests for each journals created, and Outlook was used as notifications, or information gathering. 

These connections are established and maintained by various Azure services. For example, Azure Function was used to run event triggered functions, and Azure Key Vault was used to store credentials. Some Python Scripts and Office Scripts are also used for local data and batch file processing to build this complete, automted data pipeline. Some simple Power Apps were also used; for example, Power Automate for simple integration and Power App for data visualization. 

I also implemented some AI automations such as an email chat bot that tracks employee's time tracking, and analytics about the current business. Afterall FDEs' main responsibility is to bring AI into various industries. 

Having a whole new integrated platform might sounds like a better option but given that I only had four months, an integration of platforms was more feasible. Another factor was change management. The company was already familiar with the existing Excel-based workflow and actually created a lot of very useful templates. Transfering them requires new validation and brings potential error. Manual Excel workflows obviously should be replaced, the problem was how. By integrating Excel instead of replacing Excel completely, the company could still utilize their existing Excel templates, while having most of the data transformation and validation automated. 

## How you validated the results?

We validated the result together. Accounting team gave me past journals and sources, I ran my automation based on real historical data and compare the result. Nothing was pushed to production unless validated in sandbox environment, to secure the accounting book. We used weekly meetings to study and align the process, demo the automation, gather the feedbacks, and validate against the real historical data and journals. Workflows were also examined by the power user to make sure they were conftable with the new system and were willing to adopt. 

