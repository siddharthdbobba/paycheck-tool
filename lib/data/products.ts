import type { Product } from '@/lib/calc/types'

export const PRODUCTS: Product[] = [
  // === Savings ===
  {
    id: 'savings-sofi', category: 'savings', name: 'SoFi Checking & Savings',
    blurb: 'High-yield savings with no account fees and a signup bonus.',
    highlights: ['4.0% APY', 'No monthly fee', '$250 signup bonus with direct deposit', 'All-in-one app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/sofi', payoutNote: '~$20-75 funded',
  },
  {
    id: 'savings-ally', category: 'savings', name: 'Ally Online Savings',
    blurb: 'Reliable high-yield savings from a well-known online bank.',
    highlights: ['3.8% APY', 'No minimum deposit', 'No monthly fees', '24/7 customer service'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/ally', payoutNote: 'varies',
  },
  {
    id: 'savings-wealthfront', category: 'savings', name: 'Wealthfront Cash Account',
    blurb: 'High APY savings with instant access and no fees.',
    highlights: ['4.0% APY', 'FDIC insured up to $8M', 'No account fees', 'Instant transfers'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/wealthfront', payoutNote: '~$25-50 funded',
  },
  {
    id: 'savings-capitalone', category: 'savings', name: 'Capital One 360 Performance Savings',
    blurb: 'Reliable high-yield savings from a trusted national bank.',
    highlights: ['3.8% APY', 'No fees', 'No minimum balance', 'Great mobile app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone', payoutNote: 'varies',
  },

  // === Brokerage ===
  {
    id: 'brokerage-fidelity', category: 'brokerage', name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds (FXAIX, FZROX)', 'Beginner friendly app', 'Excellent customer service'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fidelity', payoutNote: 'varies',
  },
  {
    id: 'brokerage-vanguard', category: 'brokerage', name: 'Vanguard Roth IRA',
    blurb: 'The OG low-cost brokerage — perfect for buy-and-hold investors.',
    highlights: ['No account fees', 'Ultra-low-cost ETFs (VTI, VOO)', 'Strong retirement focus', 'Trusted by millions'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/vanguard', payoutNote: 'varies',
  },
  {
    id: 'brokerage-schwab', category: 'brokerage', name: 'Schwab Roth IRA',
    blurb: 'Best customer service + a solid lineup of low-cost index funds.',
    highlights: ['No account fees', 'Best-in-class customer support', 'Great checking integration', 'Excellent research tools'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/schwab', payoutNote: 'varies',
  },

  // === Credit Cards ===
  {
    id: 'card-discover-student', category: 'card', name: 'Discover it Student Cash Back',
    blurb: 'Starter cash-back card that builds credit with solid rewards.',
    highlights: ['No annual fee', '2% cash back at restaurants', 'Cashback match after first year', 'Good grades reward ($20/yr)'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/discover-student', payoutNote: '~$50 approval',
  },
  {
    id: 'card-capitalone-savor', category: 'card', name: 'Capital One SavorOne Student',
    blurb: 'Excellent dining and entertainment rewards for new grads.',
    highlights: ['No annual fee', '3% cash back on dining', '3% on entertainment', 'No foreign transaction fees'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone-savor', payoutNote: '~$50-75 approval',
  },
  {
    id: 'card-chase-freedom-rise', category: 'card', name: 'Chase Freedom Rise',
    blurb: 'Build credit with a simple, no-fee card from a major bank.',
    highlights: ['No annual fee', '1.5% cash back on everything', 'Credit building tools', 'Automatic credit line review'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/chase-rise', payoutNote: '~$50 approval',
  },
  {
    id: 'card-bofa-customized', category: 'card', name: 'Bank of America Customized Cash Rewards',
    blurb: 'Choose your 3% cash-back category — great for recent grads.',
    highlights: ['No annual fee', '3% in category of your choice', 'Online banking bonus', 'Preferred Rewards boost'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/bofa-customized', payoutNote: '~$50-100 approval',
  },

  // === Budgeting ===
  {
    id: 'budgeting-ynab', category: 'budgeting', name: 'YNAB (You Need A Budget)',
    blurb: 'Zero-based budgeting that helps you give every dollar a job.',
    highlights: ['$14.99/mo (free for students 1 year)', 'Zero-based budgeting method', 'Bank sync + goal tracking', 'Best-in-class teaching content'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/ynab', payoutNote: '~$6 per trial start',
  },
  {
    id: 'budgeting-everydollar', category: 'budgeting', name: 'EveryDollar',
    blurb: 'Simple, free zero-based budget app from Ramsey Solutions.',
    highlights: ['Free plan available', 'Quick monthly budget setup', 'Clean, beginner-friendly UI', 'Premium adds bank sync'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/everydollar', payoutNote: 'varies',
  },
  {
    id: 'budgeting-monarch', category: 'budgeting', name: 'Monarch Money',
    blurb: 'All-in-one budgeting and net-worth tracking — a Mint replacement.',
    highlights: ['$14.99/mo (or $99.99/yr)', 'Tracks all accounts in one place', 'Net worth + investment tracking', 'Couples-friendly shared budgets'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/monarch', payoutNote: '~$10 per trial start',
  },
  {
    id: 'budgeting-rocketmoney', category: 'budgeting', name: 'Rocket Money',
    blurb: 'Free app that tracks spending and cancels unwanted subscriptions.',
    highlights: ['Free plan available', 'Finds & cancels subscriptions', 'Bill negotiation service', 'Spending alerts'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/rocketmoney', payoutNote: 'varies',
  },

  // === Investing ===
  {
    id: 'investing-acorns', category: 'investing', name: 'Acorns',
    blurb: 'Automatically invests your spare change into diversified ETFs.',
    highlights: ['$3/mo starter plan', 'Round-up investing on autopilot', 'Hands-off ETF portfolios', 'Great for first-time investors'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/acorns', payoutNote: '~$5-10 funded',
  },
  {
    id: 'investing-betterment', category: 'investing', name: 'Betterment',
    blurb: 'Robo-advisor that builds and rebalances a portfolio for you.',
    highlights: ['0.25% annual AUM fee', 'Automatic rebalancing', 'Tax-loss harvesting', 'Goal-based investing'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/betterment', payoutNote: 'varies',
  },
  {
    id: 'investing-m1', category: 'investing', name: 'M1 Finance',
    blurb: 'Build a custom "pie" of stocks and ETFs with automated investing.',
    highlights: ['No management fee', 'Customizable portfolio pies', 'Automated deposits & rebalancing', 'Fractional shares'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/m1', payoutNote: '~$10-30 funded',
  },

  // === Insurance ===
  {
    id: 'insurance-lemonade', category: 'insurance', name: 'Lemonade Renters Insurance',
    blurb: 'Renters coverage in minutes from an app, starting around $5/mo.',
    highlights: ['From ~$5/mo', 'Sign up in under 2 minutes', 'Fast, app-based claims', 'Covers theft, damage & liability'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/lemonade', payoutNote: '~$8-15 per policy',
  },
  {
    id: 'insurance-policygenius', category: 'insurance', name: 'Policygenius',
    blurb: 'Compare quotes from top insurers for life, renters, and more.',
    highlights: ['Free comparison marketplace', 'Multiple carriers in one place', 'Licensed agent support', 'No-pressure shopping'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/policygenius', payoutNote: 'varies by policy',
  },
  {
    id: 'insurance-fabric', category: 'insurance', name: 'Fabric by Gerber Life',
    blurb: 'Affordable term life insurance built for young adults and parents.',
    highlights: ['Term life from a few dollars/mo', 'Apply online in minutes', 'No medical exam for many applicants', 'Free will & beneficiary tools'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fabric', payoutNote: '~$10-20 per application',
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
export function productsForCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
