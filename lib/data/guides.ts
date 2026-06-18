export type GuideSlug =
  | 'roth-vs-traditional-401k'
  | 'how-much-of-my-paycheck-to-save'
  | '401k-match-vs-student-loans'
  | 'why-is-my-first-paycheck-so-small'

type GuideLink = {
  href: string
  label: string
  description: string
}

type GuideFaq = {
  question: string
  answer: string
}

type GuideSubsection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

type GuideSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  subsections?: GuideSubsection[]
}

export type Guide = {
  slug: GuideSlug
  title: string
  shortTitle: string
  summary: string
  metaTitle: string
  metaDescription: string
  bestLink: GuideLink
  supportLink: GuideLink
  relatedLinks: GuideLink[]
  sourceLinks?: GuideLink[]
  faqs: GuideFaq[]
  sections: GuideSection[]
}

export const GUIDES: Guide[] = [
  {
    slug: 'roth-vs-traditional-401k',
    title: 'Roth vs Traditional 401(k): Which Should a New Grad Pick?',
    shortTitle: 'roth vs traditional 401k',
    summary: 'A practical way to choose between paying tax now with Roth contributions or later with traditional 401(k) contributions.',
    metaTitle: 'Roth vs Traditional 401(k) for New Grads (2026)',
    metaDescription:
      'Learn when a Roth 401(k) usually makes sense for young earners, when traditional can be better, and why the employer match comes first.',
    bestLink: {
      href: '/best/best-roth-ira-brokerages',
      label: 'best Roth IRA brokerages for beginners',
      description: 'Compare simple places to open a Roth IRA after you capture your workplace match.',
    },
    supportLink: {
      href: '/first-paycheck-checklist',
      label: 'first paycheck checklist',
      description: 'Put your 401(k), Roth IRA, emergency fund, and budget in the right order.',
    },
    relatedLinks: [
      {
        href: '/guides/401k-match-vs-student-loans',
        label: '401k match vs student loans',
        description: 'Decide how the employer match fits beside required debt payments.',
      },
      {
        href: '/guides/how-much-of-my-paycheck-to-save',
        label: 'how much of my paycheck to save',
        description: 'Translate the account choice into a monthly savings target.',
      },
    ],
    faqs: [
      {
        question: 'Should a new grad choose Roth or traditional 401(k)?',
        answer:
          'A Roth 401(k) is a common rule of thumb for young workers in lower tax brackets, but it is not absolute. Traditional can make sense when your current tax rate is high or you need more take-home pay.',
      },
      {
        question: 'Does my employer match change if I pick Roth?',
        answer:
          'Many plans match Roth contributions, but employer match dollars may be treated differently for tax purposes. Check your plan document and still aim to capture the full match first.',
      },
      {
        question: 'Can I split between Roth and traditional?',
        answer:
          'Many plans allow a split. A split can be reasonable when you want tax diversification or are unsure whether your current or future tax rate will be higher.',
      },
    ],
    sections: [
      {
        heading: 'Start with the match, not the tax debate',
        paragraphs: [
          'The highest-priority move is usually simple: contribute enough to capture your full employer 401(k) match before optimizing Roth versus traditional. A match is part of your compensation. If your plan says the company matches a percentage of pay after you contribute, skipping that contribution can mean leaving earned compensation unused.',
          'Once you are on track for the full match, the Roth versus traditional choice is about timing taxes. Roth contributions go in after tax, so they do not lower this year\'s taxable wages. Traditional contributions generally reduce taxable wages now, but withdrawals are taxed later. Neither choice is universally better. The better default depends on your current tax rate, likely future tax rate, cash-flow needs, and plan rules.',
        ],
      },
      {
        heading: 'The common new-grad rule of thumb',
        paragraphs: [
          'For many young workers early in their careers, Roth is the common rule of thumb. The reasoning is modest, not magic: if you are in a lower bracket now than you expect later, paying tax now can be attractive. A new grad may also have decades for tax-free qualified Roth growth.',
          'That rule of thumb breaks down when your current bracket is already high, when you live in a high-tax state temporarily, when you need the paycheck room created by traditional contributions, or when your employer plan has limited Roth features. The practical answer can also be a split, especially if you want some tax diversification.',
        ],
        subsections: [
          {
            heading: 'When Roth often fits',
            paragraphs: [
              'Roth often fits when your salary is still ramping, your tax bracket is relatively low, and you can afford the smaller take-home pay. It can also pair well with a Roth IRA if you are eligible and already receiving the full workplace match.',
            ],
            bullets: [
              'You expect higher taxable income later.',
              'You value tax-free qualified withdrawals in retirement.',
              'Your emergency fund is not being starved to make the contribution.',
            ],
          },
          {
            heading: 'When traditional can be reasonable',
            paragraphs: [
              'Traditional can be reasonable when the upfront tax deduction helps you save more, make rent comfortably, or build an emergency fund faster. It may also fit if your current income is unusually high compared with what you expect in retirement.',
            ],
            bullets: [
              'You need more take-home pay to avoid debt.',
              'You are in a higher current tax bracket.',
              'You want the tax deduction now and accept taxable withdrawals later.',
            ],
          },
        ],
      },
      {
        heading: 'A practical order for your first year',
        paragraphs: [
          'Use a sequence instead of trying to solve every account at once. First, contribute enough to receive the full employer match. Second, build a starter emergency fund so one car repair or medical bill does not become credit-card debt. Third, decide whether extra retirement dollars should go to Roth 401(k), traditional 401(k), Roth IRA, or a mix.',
          'If your plan has weak investment options or high fees, you may still capture the match at work and then use an IRA for additional savings. If your plan is strong and convenient, increasing the 401(k) contribution may be simpler. Revisit the decision when your salary, state, filing status, or student-loan payment changes.',
        ],
      },
    ],
  },
  {
    slug: 'how-much-of-my-paycheck-to-save',
    title: 'How Much of Your Paycheck Should You Actually Save?',
    shortTitle: 'how much of my paycheck to save',
    summary: 'Use 50/30/20, your employer match, and a starter emergency fund to turn each paycheck into a realistic savings plan.',
    metaTitle: 'How Much of My Paycheck Should I Save? (2026 Guide)',
    metaDescription:
      'A realistic new-grad savings framework using 50/30/20, emergency fund basics, employer match priorities, and paycheck cash flow.',
    bestLink: {
      href: '/best/best-budgeting-apps',
      label: 'best budgeting apps for your first paycheck',
      description: 'Compare tools that help you track needs, wants, savings, and debt payments.',
    },
    supportLink: {
      href: '/take-home-pay/california',
      label: 'California take-home pay details',
      description: 'See how state withholding changes the paycheck you can actually budget from.',
    },
    relatedLinks: [
      {
        href: '/guides/why-is-my-first-paycheck-so-small',
        label: 'why is my first paycheck so small',
        description: 'Understand why take-home pay can be lower than offer-letter math.',
      },
      {
        href: '/guides/roth-vs-traditional-401k',
        label: 'roth vs traditional 401k',
        description: 'Choose the tax treatment for the retirement portion of your savings.',
      },
    ],
    faqs: [
      {
        question: 'Is saving 20% of take-home pay required?',
        answer:
          'No. The 50/30/20 framework is a useful starting point, not a rule. If rent, debt, or a first emergency fund makes 20% unrealistic, start smaller and increase the rate over time.',
      },
      {
        question: 'Should emergency savings come before investing?',
        answer:
          'A starter emergency fund usually comes before aggressive investing because it helps prevent credit-card debt when an ordinary surprise expense appears.',
      },
      {
        question: 'Should 401(k) contributions count as savings?',
        answer:
          'Yes. Retirement contributions are savings, but keep some savings liquid too. A 401(k) match is valuable, while an emergency fund protects your monthly cash flow.',
      },
    ],
    sections: [
      {
        heading: 'Begin with take-home pay',
        paragraphs: [
          'The right savings rate starts with the money that actually lands in your bank account, not your salary. Federal income tax withholding, FICA payroll taxes, state withholding in many states, health insurance, and 401(k) deductions all reduce your check before you budget it.',
          'A useful first target is to save something from every paycheck while building toward a plan you can repeat. If saving 20% immediately makes you use a credit card for groceries, the plan is too aggressive. If you save nothing because the perfect plan feels complicated, the plan is too vague.',
        ],
      },
      {
        heading: 'Use 50/30/20 as a starting map',
        paragraphs: [
          'The 50/30/20 framework divides after-tax income into needs, wants, and savings or debt payoff. It is popular because it is simple enough to use on a first paycheck, but flexible enough to adjust for a high-rent city or required student-loan payments.',
          'Needs are the bills you must pay to keep life stable: rent, utilities, groceries, transportation, insurance, minimum debt payments, and basic medical costs. Wants are optional spending such as dining out, subscriptions, travel, and upgrades. Savings includes emergency fund deposits, retirement contributions, extra debt payments, and investing.',
        ],
        bullets: [
          '50% for needs gives you a warning if fixed costs are too high.',
          '30% for wants keeps the budget livable instead of punitive.',
          '20% for savings gives each paycheck a future job.',
        ],
        subsections: [
          {
            heading: 'If 20% is too high',
            paragraphs: [
              'Start with the employer 401(k) match, then set an automatic transfer to savings on payday. Even a small automatic transfer teaches the system and makes lifestyle creep less likely. Increase it after raises, debt payoff, or a cheaper housing decision.',
            ],
          },
          {
            heading: 'If 20% feels easy',
            paragraphs: [
              'Move past the starter emergency fund toward several months of essential expenses, then consider increasing retirement contributions or saving for near-term goals. Do not let a high savings rate hide weak insurance, high-interest debt, or missed employer match dollars.',
            ],
          },
        ],
      },
      {
        heading: 'Put savings in the right order',
        paragraphs: [
          'A sensible first-year order is: capture the full employer 401(k) match, build a starter emergency fund, pay minimums on all debts, attack high-interest debt, and then increase retirement or other investing. Student loans and low-rate debt may fit later in the order, depending on required payments and interest rates.',
          'The goal is not to win a spreadsheet. The goal is to create a paycheck routine that survives real life. A small emergency fund reduces the chance that one surprise bill undoes your budget. A full match keeps compensation from being left behind. A repeatable savings rate gives you momentum.',
        ],
      },
    ],
  },
  {
    slug: '401k-match-vs-student-loans',
    title: 'Should You Fund Your 401(k) Match or Pay Off Student Loans First?',
    shortTitle: '401k match vs student loans',
    summary: 'A balanced order for employer match dollars, minimum loan payments, emergency savings, and extra debt payoff.',
    metaTitle: '401(k) Match vs Student Loans: What Comes First? (2026)',
    metaDescription:
      'Compare employer 401(k) match contributions with student-loan payoff priorities using consensus first-paycheck money rules.',
    bestLink: {
      href: '/best/best-investing-apps-beginners',
      label: 'best investing apps for beginners',
      description: 'Compare beginner investing options after your match, emergency fund, and debt plan are stable.',
    },
    supportLink: {
      href: '/first-paycheck-checklist',
      label: 'first paycheck checklist',
      description: 'Follow the broader sequence for your first pay stub, 401(k), emergency fund, and budget.',
    },
    relatedLinks: [
      {
        href: '/guides/how-much-of-my-paycheck-to-save',
        label: 'how much of my paycheck to save',
        description: 'Fit loan payments and retirement savings into one paycheck plan.',
      },
      {
        href: '/guides/roth-vs-traditional-401k',
        label: 'roth vs traditional 401k',
        description: 'Choose the tax treatment after deciding to contribute enough for the match.',
      },
    ],
    faqs: [
      {
        question: 'Should I skip my 401(k) match to pay student loans faster?',
        answer:
          'Usually no. A full employer match is commonly treated as the first retirement priority, as long as you can still make required loan payments and cover basic expenses.',
      },
      {
        question: 'What if my student loan interest rate is high?',
        answer:
          'High-interest debt deserves attention after required payments, starter emergency savings, and usually the full employer match. The exact order depends on rate, cash flow, and risk tolerance.',
      },
      {
        question: 'Do minimum loan payments count in 50/30/20?',
        answer:
          'Minimum required payments usually belong with needs. Extra payments can fit in the savings/debt-payoff bucket.',
      },
    ],
    sections: [
      {
        heading: 'Separate required payments from extra payments',
        paragraphs: [
          'Before comparing your 401(k) match with student loans, separate minimum required loan payments from extra principal payments. Minimum payments are bills. Missing them can create fees, credit damage, and stress. Extra payments are a choice about how to use surplus cash.',
          'Once minimums are covered, the employer match usually comes before extra loan payments. The reason is straightforward: a match is compensation tied to your contribution. If your employer offers a match and you contribute too little to receive all of it, you may be declining part of your pay package.',
        ],
      },
      {
        heading: 'A practical priority order',
        paragraphs: [
          'Most new grads need an order that protects cash flow, not just the mathematically highest return. The usual sequence is to pay required bills, capture the full 401(k) match, build a starter emergency fund, and then decide how aggressively to pay loans versus invest more.',
          'This order is not a promise that investing will beat your student-loan rate. It is a risk-management framework. Required payments keep accounts current. The match captures compensation. Emergency savings prevents new credit-card debt. Extra payments then reduce guaranteed interest cost.',
        ],
        bullets: [
          'Always make minimum required student-loan payments.',
          'Contribute enough to receive the full employer 401(k) match when cash flow allows.',
          'Build starter emergency savings before sending every spare dollar to debt.',
          'Prioritize high-interest debt more aggressively than low-interest debt.',
        ],
        subsections: [
          {
            heading: 'When extra loan payments move up',
            paragraphs: [
              'Extra loan payments move up when the interest rate is high, the payment creates anxiety, or the debt blocks other goals. A guaranteed reduction in interest cost can be valuable, especially when the alternative is taxable investing outside retirement accounts.',
            ],
          },
          {
            heading: 'When investing more can wait',
            paragraphs: [
              'Investing beyond the match can wait when you have no cash buffer, unstable income, or expensive debt. A retirement account is important, but it is not a substitute for having money available when rent, transportation, or medical costs arrive.',
            ],
          },
        ],
      },
      {
        heading: 'Build the decision around your paycheck',
        paragraphs: [
          'Run the numbers by paycheck rather than by annual salary. If a 5% 401(k) contribution earns the full match and still leaves room for minimum student-loan payments, rent, groceries, and a small savings transfer, that is often a solid starting point. If it makes you cash-flow negative, reduce pressure elsewhere before forcing the contribution higher.',
          'Recheck the plan after loan recertification, refinancing, a raise, or a move to a new state. The right answer can change when your required payment, tax withholding, or housing cost changes.',
        ],
      },
    ],
  },
  {
    slug: 'why-is-my-first-paycheck-so-small',
    title: 'Why Is My First Paycheck Smaller Than I Expected?',
    shortTitle: 'why is my first paycheck so small',
    summary: 'Understand federal withholding, FICA payroll taxes, state withholding, pre-tax deductions, and partial pay periods.',
    metaTitle: 'Why Is My First Paycheck So Small? (2026 Guide)',
    metaDescription:
      'A plain-English guide to why first paychecks look smaller than expected, including withholding, FICA, state taxes, benefits, and timing.',
    bestLink: {
      href: '/best/best-high-yield-savings',
      label: 'best high-yield savings accounts for new grads',
      description: 'Find a place for your starter emergency fund once your first paycheck lands.',
    },
    supportLink: {
      href: '/take-home-pay/new-york',
      label: 'New York take-home pay details',
      description: 'See an example of how state withholding can change your paycheck.',
    },
    relatedLinks: [
      {
        href: '/guides/how-much-of-my-paycheck-to-save',
        label: 'how much of my paycheck to save',
        description: 'Budget from the money that actually lands in your account.',
      },
      {
        href: '/guides/401k-match-vs-student-loans',
        label: '401k match vs student loans',
        description: 'Decide what to do after you understand the smaller take-home number.',
      },
    ],
    sourceLinks: [
      {
        href: 'https://www.irs.gov/taxtopics/tc751',
        label: 'IRS Topic 751: Social Security and Medicare withholding rates',
        description: 'Official source for the employee Social Security and Medicare withholding rates referenced above.',
      },
    ],
    faqs: [
      {
        question: 'Why is my first paycheck lower than my salary math?',
        answer:
          'Salary math usually ignores federal withholding, FICA payroll taxes, state withholding where applicable, benefit premiums, retirement deductions, and possible partial pay periods.',
      },
      {
        question: 'What are FICA taxes?',
        answer:
          'FICA payroll taxes fund Social Security and Medicare. Employees generally pay 6.2% for Social Security up to the wage base and 1.45% for Medicare, with additional Medicare tax above a high income threshold.',
      },
      {
        question: 'Can my first paycheck be a partial check?',
        answer:
          'Yes. If you started in the middle of a pay period, the first check may cover fewer days than a normal paycheck.',
      },
    ],
    sections: [
      {
        heading: 'Your salary is not your deposit',
        paragraphs: [
          'A first paycheck often feels smaller because the offer-letter salary is a gross annual number. Your bank deposit is net pay after several deductions. The gap is normal, but it is worth checking so you know whether the paycheck is merely smaller than expected or actually wrong.',
          'Start by comparing the pay stub to the dates covered. Many first checks are partial because the job started after the pay period began. A semi-monthly employee who starts halfway through a pay period should not expect a full semi-monthly check. That timing issue is separate from taxes and benefits.',
        ],
      },
      {
        heading: 'The main deductions on a first paycheck',
        paragraphs: [
          'Federal income tax withholding is an estimate based on your Form W-4 and payroll system. It is not your final tax bill. If too much is withheld during the year, the difference can come back as a refund. If too little is withheld, you may owe when you file.',
          'FICA is separate from income tax. The IRS lists employee Social Security withholding at 6.2% and Medicare withholding at 1.45%, with Social Security applying only up to the annual wage base and Medicare generally applying to all covered wages. Many workers also see state income tax withholding, and some localities have local taxes.',
        ],
        bullets: [
          'Federal withholding depends on your W-4 and taxable wages.',
          'FICA includes Social Security and Medicare payroll taxes.',
          'State withholding depends on where you work and live.',
          'Benefits and retirement contributions can reduce your deposit too.',
        ],
        subsections: [
          {
            heading: 'Pre-tax deductions can be good news',
            paragraphs: [
              'Health insurance, HSA contributions, commuter benefits, and traditional 401(k) contributions may reduce the amount deposited, but some also reduce taxable wages. Roth 401(k) contributions are different because they are after-tax contributions, so they reduce take-home pay without lowering current taxable wages the same way.',
            ],
          },
          {
            heading: 'Post-tax deductions still matter',
            paragraphs: [
              'Some deductions happen after taxes, such as certain insurance options or Roth retirement contributions. They may be worthwhile, but they still make the deposit smaller. The pay stub should label each deduction so you can tell what is tax, what is benefit cost, and what is retirement saving.',
            ],
          },
        ],
      },
      {
        heading: 'What to check before calling payroll',
        paragraphs: [
          'Check the pay period dates, gross pay, hours or salary rate, federal withholding, state withholding, benefit premiums, and retirement contribution percentage. Also confirm whether any sign-on bonus, relocation payment, or one-time reimbursement is paid on a different schedule.',
          'Contact payroll if your gross pay is wrong, your hours are missing, your benefit deductions do not match elections, or your W-4 information was entered incorrectly. If the math is correct but the deposit is simply lower than expected, use the smaller net number to build your budget and emergency-fund plan.',
        ],
      },
    ],
  },
]

export function allGuides() {
  return GUIDES
}

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug)
}
