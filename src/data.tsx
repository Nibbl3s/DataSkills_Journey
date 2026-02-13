import {
    Building2,
    TrendingUp,
    Bot,
    Presentation,
    Award,
} from 'lucide-react';
import type { WeekData, Resource, SkillItem } from './types';

// --- Course Data (extracted from App.tsx) ---

export const COURSE_DATA: WeekData[] = [
    {
        id: 'w1',
        week: 1,
        phase: 'Phase 1: Foundations',
        title: 'Founding Your Company',
        subtitle: 'Excel Empire: Lesson 1',
        icon: <Building2 className="w-6 h-6" />,
        color: 'bg-blue-600',
        description: "You are an ambitious entrepreneur ready to start your own company. Using Excel, you'll set up the basic structure of your business empire — then expand operations by tracking sales, managing inventory, and planning for future growth.",
        learningObj: "Create and organize multiple worksheets, use basic Excel functions (TODAY, CONCATENATE, SUM, COUNT, DATEDIF), set up tables with appropriate headers, use absolute and relative cell references, apply basic formatting, use XLOOKUP and IF functions, create named ranges, implement data validation, and use SUMIF and COUNTIF for conditional calculations.",
        deliverables: [
            { title: "Task 1: Company Setup", desc: 'Choose a business type, name it, create a new workbook, and add a "Company Overview" sheet.' },
            { title: "Task 2: Company Foundation", desc: "Enter company details using TODAY(), RANDBETWEEN, and lock in your starting capital." },
            { title: "Task 3: Employee Roster", desc: 'Create an "Employee Roster" sheet with at least 5 employees, using CONCATENATE for Employee IDs.' },
            { title: "Task 4: Initial Inventory", desc: 'Create a "Stock Inventory" sheet with 10+ items, formulas for Total Value, and SUM for totals.' },
            { title: "Task 5: Company Dashboard", desc: 'Create a "Dashboard" sheet using cell references, DATEDIF, COUNTA, and SUM across sheets.' },
            { title: "Task 6: Sales Tracking System", desc: 'Create a "Sales Log" sheet using XLOOKUP for product data and IF for discount logic.' },
            { title: "Task 7: Inventory Management", desc: "Add reorder levels, supplier info, named ranges, data validation, conditional formatting, and SUMPRODUCT." },
            { title: "Task 8: Create Tables", desc: "Convert all data to tables with proper names and structured references." }
        ],
        mode: "Self-Guided Simulation"
    },
    {
        id: 'w2',
        week: 2,
        phase: 'Phase 1: Foundations',
        title: 'Expanding Operations',
        subtitle: 'Excel Empire: Lesson 2',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'bg-blue-500',
        description: "Your startup has successfully launched and it is time to expand. Analyze sales performance, manage your growing customer base, identify top customers, and uncover trends to grow your business.",
        learningObj: "Create basic charts to visualize business data, build a sales tracking system, implement XLOOKUP and SUMIF for data retrieval, format data as tables, use pivot tables to summarize and analyze sales, create a basic CRM system, visualize data with charts and conditional formatting, and enhance interactive dashboards.",
        deliverables: [
            { title: "Task 1: Enhanced Dashboard", desc: "Add total sales, best-selling product (MAXIFS), a column chart, an expense overview, and a pie chart." },
            { title: "Task 2: Sales Tracking System", desc: "Expand Sales Log to 50+ entries with XLOOKUP, IF discounts, Customer IDs, and format as a table." },
            { title: "Task 3: Customer Database", desc: "Create 20+ customers with generated emails, phone numbers, and SUMIF for lifetime value." },
            { title: "Task 4: Sales Analysis with Pivot Tables", desc: "Build pivot tables for sales by product and month, add slicers, and create a pivot pie chart." },
            { title: "Task 5: Customer Insights Dashboard", desc: "Top 5 customers (LARGE), dropdown selection with XLOOKUP, FILTER for purchase history, and charts." },
            { title: "Task 6: User Friendly Dashboard", desc: "Protect the sheet so users can only interact with the product dropdown; lock all other cells." }
        ],
        mode: "Deep-Dive Problem Solving"
    },
    {
        id: 'w3',
        week: 3,
        phase: 'Phase 2: AI Consultant',
        title: 'Generating the Challenge',
        subtitle: 'Design Your Own Exercises',
        icon: <Bot className="w-6 h-6" />,
        color: 'bg-purple-600',
        description: "Use the Excel Challenge Generator to create five realistic business challenges and datasets based on a country and domain you choose. You will focus on building the practice environment, not solving the problems for you.",
        learningObj: "Generate structured Excel challenges, request datasets, interpret acceptance criteria, and prepare your work for group presentations while using hints and solution outlines responsibly.",
        deliverables: [
            { title: "Step 0: Access the Generator", desc: "Use one of the challenge generators: https://chatgpt.com/g/g-68c7b9ac65c88191af3b9035c145b0a3-excel-exercise-generator or https://www.perplexity.ai/spaces/excel-challenges-creator-0gx2JeNeQQy92PMePI.nXw#0." },
            { title: "Step 1: Provide Inputs", desc: "Choose a Country and Domain to set the business context." },
            { title: "Step 2: Generate 5 Challenges", desc: "Receive five challenges with tasks, acceptance criteria, and hints." },
            { title: "Step 3: Request Datasets", desc: "Ask for a dataset per challenge and download the generated file." },
            { title: "Step 4: Complete Challenges", desc: "Follow tasks, use hints, and self-check with acceptance criteria." },
            { title: "Step 5: Save Deliverables", desc: "Save each solution as [ChallengeTitle]_[LastName]_[FirstName].xlsx." },
            { title: "Step 6: Prepare for Week 4", desc: "Note what was easy or hard and select 2-3 challenges for presentation." }
        ],
        mode: "AI Collaboration & Verification"
    },
    {
        id: 'w4',
        week: 4,
        phase: 'Phase 2: AI Consultant',
        title: 'Solving & Presenting',
        subtitle: 'The Consultant Report',
        icon: <Presentation className="w-6 h-6" />,
        color: 'bg-purple-500',
        description: "Analyze the data you generated and present your findings to your 'Manager' (classmates).",
        learningObj: "Data visualization, storytelling with data, and professional communication.",
        deliverables: [
            { title: "Analysis", desc: "Solve the specific exercises generated in Week 3." },
            { title: "Visual Report", desc: "Create a dashboard/visuals that answer the problem statement." },
            { title: "Presentation (6 mins)", desc: "Present ONE key insight to the class." },
            { title: "Peer Review", desc: "Evaluate the logic of other groups." }
        ],
        mode: "Group Work & Presentation"
    },
    {
        id: 'w5',
        week: 5,
        phase: 'Phase 3: Capstone',
        title: 'Excel Your Way',
        subtitle: 'Independent Mastery',
        icon: <Award className="w-6 h-6" />,
        color: 'bg-emerald-600',
        description: "Build an original Excel tool and a professional report that explain a real-world problem and how your workbook solves it. Then pitch your tool in a short video.",
        learningObj: "Design a multi-sheet Excel tool with named tables, analysis, and dashboards; document your process in a structured report with references; and deliver a concise video pitch that demonstrates real usage.",
        deliverables: [
            { title: "Deliverable 1: Excel Tool", desc: "Create a 4-5+ sheet workbook with raw data, analysis (charts/pivots), and a linked interface. Use named tables and professional naming." },
            { title: "Deliverable 2: Word Report", desc: "Explain the problem, your design choices, your process, and references (APA). Mention any assistance used and include links to tools and prompts." },
            { title: "Deliverable 3: Video Pitch", desc: "Record a 2-4 minute infomercial-style pitch showing your tool in action." },
            { title: "Naming Requirements", desc: "Excel: IBMxx_YourName_NameOfYourTool.xlsx; PDF: IBMxx_YourName_NameOfYourTool.pdf; Video: IBMxx_YourName_VideoPitch.mp4." },
            { title: "Evaluation Focus", desc: "Named tables, lookups, xIF functions, charts, pivot tables, text/date/numeric functions, nested formulas, and data validation." },
            { title: "Evaluation Criteria", desc: "Excel functionality and Excel functions (named tables, lookups, xIFs, conditional formatting, charts, pivots, text/date/numeric, nested functions, data validation), plus report quality, Word features, and referencing." },
        ],
        mode: "Independent Project"
    }
];

// --- Feature: Resource Hub Data ---

export const RESOURCES_DATA: Record<string, Resource[]> = {
    w1: [
        { title: "Excel: Organizing Worksheets", url: "https://www.excel-easy.com/basics/worksheets.html", type: "tutorial" },
        { title: "TODAY Function", url: "https://support.microsoft.com/en-us/search?query=TODAY%20function", type: "reference" },
        { title: "Cell Referencing (Absolute vs Relative)", url: "https://support.microsoft.com/en-us/search?query=relative%20absolute%20mixed%20references", type: "reference" },
        { title: "XLOOKUP Function", url: "https://support.microsoft.com/en-us/search?query=XLOOKUP%20function", type: "reference" },
        { title: "IF Function", url: "https://support.microsoft.com/en-us/search?query=IF%20function", type: "reference" },
        { title: "Named Ranges", url: "https://support.microsoft.com/en-us/search?query=define%20and%20use%20names%20in%20formulas", type: "reference" },
        { title: "Data Validation", url: "https://www.excel-easy.com/basics/data-validation.html", type: "tutorial" },
        { title: "SUMIF & COUNTIF Functions", url: "https://support.microsoft.com/en-us/search?query=SUMIF%20COUNTIF%20functions", type: "reference" },
        { title: "Structured References with Tables", url: "https://support.microsoft.com/en-us/search?query=structured%20references%20Excel%20tables", type: "reference" },
        { title: "Mock Data Generator (Mockaroo)", url: "https://www.mockaroo.com/", type: "template" },
    ],
    w2: [
        { title: 'Creating Charts in Excel', url: 'https://www.excel-easy.com/data-analysis/charts.html', type: 'tutorial' },
        { title: 'XLOOKUP Function', url: 'https://support.microsoft.com/en-us/search?query=XLOOKUP%20function', type: 'reference' },
        { title: 'SUMIF Function', url: 'https://support.microsoft.com/en-us/search?query=SUMIF%20function', type: 'reference' },
        { title: 'MAXIFS Function', url: 'https://support.microsoft.com/en-us/search?query=MAXIFS%20function', type: 'reference' },
        { title: 'Format Data as a Table', url: 'https://www.excel-easy.com/data-analysis/excel-tables.html', type: 'tutorial' },
        { title: 'Pivot Table Quick Start', url: 'https://support.microsoft.com/en-us/search?query=create%20a%20PivotTable', type: 'reference' },
        { title: 'FILTER Function', url: 'https://support.microsoft.com/en-us/search?query=FILTER%20function', type: 'reference' },
        { title: 'LARGE Function', url: 'https://support.microsoft.com/en-us/search?query=LARGE%20function', type: 'reference' },
        { title: 'Protect a Worksheet', url: 'https://www.excel-easy.com/examples/protect-sheet.html', type: 'tutorial' },
        { title: 'Conditional Formatting Guide', url: 'https://www.excel-easy.com/data-analysis/conditional-formatting.html', type: 'tutorial' },
    ],
    w3: [
        { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "tutorial" },
        { title: "Excel Exercise Generator (ChatGPT)", url: "https://chatgpt.com/g/g-68c7b9ac65c88191af3b9035c145b0a3-excel-exercise-generator", type: "template" },
        { title: "Excel Challenges Creator (Perplexity)", url: "https://www.perplexity.ai/spaces/excel-challenges-creator-0gx2JeNeQQy92PMePI.nXw#0", type: "template" },
        { title: "Excel Table Basics", url: "https://support.microsoft.com/en-us/search?query=format%20an%20Excel%20table", type: "reference" },
        { title: "Data Cleaning in Excel", url: "https://support.microsoft.com/en-us/search?query=clean%20data%20in%20Excel", type: "reference" },
        { title: "Excel Functions Overview", url: "https://support.microsoft.com/en-us/search?query=Excel%20functions%20alphabetical", type: "reference" },
        { title: "PivotTable Quick Start", url: "https://support.microsoft.com/en-us/search?query=create%20a%20PivotTable", type: "reference" },
        { title: "Charts in Excel", url: "https://www.excel-easy.com/data-analysis/charts.html", type: "tutorial" },
        { title: "Presenting Data with Charts", url: "https://support.microsoft.com/en-us/search?query=available%20chart%20types", type: "reference" },
    ],
    w4: [
        { title: "Storytelling with Data", url: "https://www.storytellingwithdata.com/", type: "reference" },
        { title: "Chart Selection Guide", url: "https://www.youtube.com/results?search_query=choose+right+chart+type", type: "video" },
        { title: "Presentation Template", url: "#", type: "template" },
        { title: "Peer Review Rubric", url: "#", type: "template" },
    ],
    w5: [
        { title: "Assignment Assistant (Excel Your Way)", url: "https://chatgpt.com/g/g-682c413345848191a86e9d24b1e88377-excel-your-way-the-assignment", type: "template" },
        { title: "Excel Tables: Structure Data", url: "https://support.microsoft.com/en-us/search?query=format%20an%20Excel%20table", type: "reference" },
        { title: "PivotTable Quick Start", url: "https://support.microsoft.com/en-us/search?query=create%20a%20PivotTable", type: "reference" },
        { title: "Charts in Excel", url: "https://www.excel-easy.com/data-analysis/charts.html", type: "tutorial" },
        { title: "Data Validation", url: "https://www.excel-easy.com/examples/data-validation.html", type: "tutorial" },
        { title: "Text Functions Overview", url: "https://support.microsoft.com/en-us/search?query=text%20functions%20reference", type: "reference" },
        { title: "Date Functions Overview", url: "https://support.microsoft.com/en-us/search?query=date%20and%20time%20functions%20reference", type: "reference" },
        { title: "Numeric Functions Overview", url: "https://support.microsoft.com/en-us/search?query=math%20and%20trig%20functions%20reference", type: "reference" },
        { title: "Eurostat", url: "https://ec.europa.eu/eurostat", type: "reference" },
        { title: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", type: "reference" },
        { title: "FRED Data", url: "https://fred.stlouisfed.org/", type: "reference" },
        { title: "Awesome Public Datasets", url: "https://github.com/awesomedata/awesome-public-datasets", type: "reference" },
        { title: "Google Dataset Search", url: "https://datasetsearch.research.google.com/", type: "reference" },
        { title: "Data.gov", url: "https://data.gov/", type: "reference" },
    ],
};

// --- Feature: Self-Assessment Skills per Week ---

export const SKILLS_DATA: Record<string, SkillItem[]> = {
    w1: [
        { id: 'w1-s1', label: 'I can create and organize multiple worksheets in a workbook' },
        { id: 'w1-s2', label: 'I can use basic functions (TODAY, CONCATENATE, SUM, COUNT, DATEDIF)' },
        { id: 'w1-s3', label: 'I understand absolute vs relative cell references' },
        { id: 'w1-s4', label: 'I can set up tables with appropriate headers and formatting' },
        { id: 'w1-s5', label: 'I can use XLOOKUP and IF for data retrieval and conditional logic' },
        { id: 'w1-s6', label: 'I can create and manage named ranges' },
        { id: 'w1-s7', label: 'I can implement data validation techniques' },
        { id: 'w1-s8', label: 'I can use SUMIF and COUNTIF for conditional calculations' },
    ],
    w2: [
        { id: 'w2-s1', label: 'I can create basic charts (column, pie) to visualize data' },
        { id: 'w2-s2', label: 'I can build a sales tracking system with XLOOKUP and formulas' },
        { id: 'w2-s3', label: 'I can use SUMIF to calculate values like customer lifetime value' },
        { id: 'w2-s4', label: 'I can format data as tables and use structured references' },
        { id: 'w2-s5', label: 'I can create and customize Pivot Tables with slicers and charts' },
        { id: 'w2-s6', label: 'I can build a CRM with customer data and FILTER function' },
        { id: 'w2-s7', label: 'I can use conditional formatting to highlight key data' },
        { id: 'w2-s8', label: 'I can protect sheets to create user-friendly dashboards' },
    ],
    w3: [
        { id: 'w3-s1', label: 'I can specify a country and domain to generate challenges' },
        { id: 'w3-s2', label: 'I can interpret tasks, acceptance criteria, and hints' },
        { id: 'w3-s3', label: 'I can request and use generated datasets responsibly' },
        { id: 'w3-s4', label: 'I can document my process and prepare for group presentations' },
    ],
    w4: [
        { id: 'w4-s1', label: 'I can create meaningful data visualizations' },
        { id: 'w4-s2', label: 'I can tell a story with data' },
        { id: 'w4-s3', label: 'I can present insights clearly in 6 minutes' },
        { id: 'w4-s4', label: 'I can evaluate the logic of peer work' },
    ],
    w5: [
        { id: 'w5-s1', label: 'I can define a real-world problem and design a useful Excel tool' },
        { id: 'w5-s2', label: 'I can build a multi-sheet workbook with named tables and linked sheets' },
        { id: 'w5-s3', label: 'I can use required Excel functions (lookups, xIFs, pivots, charts, text/date/number)' },
        { id: 'w5-s4', label: 'I can write a professional report with APA references and clear structure' },
        { id: 'w5-s5', label: 'I can present a confident 2-4 minute video pitch of my tool' },
    ],
};
