import type { Product } from '@/lib/calc/types'

export const PRODUCTS: Product[] = [
  // === Savings ===
  {
    id: 'savings-sofi', category: 'savings', name: 'SoFi Checking & Savings',
    blurb: 'High-yield savings with no account fees and a signup bonus.',
    highlights: ['4.0% APY', 'No monthly fee', '$250 signup bonus with direct deposit', 'All-in-one app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/sofi',
    rating: 4.8, bestForTag: 'direct-deposit savers', headlineStat: { value: '$250', label: 'signup bonus' }, ctaLabel: 'Get my $250 bonus',
  },
  {
    id: 'savings-ally', category: 'savings', name: 'Ally Online Savings',
    blurb: 'Reliable high-yield savings from a well-known online bank.',
    highlights: ['3.8% APY', 'No minimum deposit', 'No monthly fees', '24/7 customer service'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/ally',
    rating: 4.7, bestForTag: 'simple emergency funds', headlineStat: { value: '3.8% APY', label: 'high-yield savings' }, ctaLabel: 'Open my savings account',
  },
  {
    id: 'savings-wealthfront', category: 'savings', name: 'Wealthfront Cash Account',
    blurb: 'High APY savings with instant access and no fees.',
    highlights: ['4.0% APY', 'FDIC insured up to $8M', 'No account fees', 'Instant transfers'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/wealthfront',
    rating: 4.8, bestForTag: 'larger cash cushions', headlineStat: { value: '4.0% APY', label: 'cash account yield' }, ctaLabel: 'Build my cash cushion',
  },
  {
    id: 'savings-capitalone', category: 'savings', name: 'Capital One 360 Performance Savings',
    blurb: 'Reliable high-yield savings from a trusted national bank.',
    highlights: ['3.8% APY', 'No fees', 'No minimum balance', 'Great mobile app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone',
    rating: 4.6, bestForTag: 'national-bank comfort', headlineStat: { value: '$0', label: 'monthly fee' }, ctaLabel: 'Open my no-fee savings',
  },

  // === Brokerage ===
  {
    id: 'brokerage-fidelity', category: 'brokerage', name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds (FXAIX, FZROX)', 'Beginner friendly app', 'Excellent customer service'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fidelity',
    rating: 4.9, bestForTag: 'first Roth IRA', headlineStat: { value: '$0', label: 'account minimum' }, ctaLabel: 'Start my Roth IRA',
  },
  {
    id: 'brokerage-vanguard', category: 'brokerage', name: 'Vanguard Roth IRA',
    blurb: 'The OG low-cost brokerage — perfect for buy-and-hold investors.',
    highlights: ['No account fees', 'Ultra-low-cost ETFs (VTI, VOO)', 'Strong retirement focus', 'Trusted by millions'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/vanguard',
    rating: 4.8, bestForTag: 'buy-and-hold investors', headlineStat: { value: '$0', label: 'account fee' }, ctaLabel: 'Open my long-term IRA',
  },
  {
    id: 'brokerage-schwab', category: 'brokerage', name: 'Schwab Roth IRA',
    blurb: 'Best customer service + a solid lineup of low-cost index funds.',
    highlights: ['No account fees', 'Best-in-class customer support', 'Great checking integration', 'Excellent research tools'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/schwab',
    rating: 4.8, bestForTag: 'support and banking', headlineStat: { value: '$0', label: 'online equity trades' }, ctaLabel: 'Open my Schwab IRA',
  },

  // === Credit Cards ===
  {
    id: 'card-discover-student', category: 'card', name: 'Discover it Student Cash Back',
    blurb: 'Starter cash-back card that builds credit with solid rewards.',
    highlights: ['No annual fee', '2% cash back at restaurants', 'Cashback match after first year', 'Good grades reward ($20/yr)'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/discover-student',
    rating: 4.7, bestForTag: 'student credit builders', headlineStat: { value: '$0', label: 'annual fee' }, ctaLabel: 'Start building credit',
  },
  {
    id: 'card-capitalone-savor', category: 'card', name: 'Capital One SavorOne Student',
    blurb: 'Excellent dining and entertainment rewards for new grads.',
    highlights: ['No annual fee', '3% cash back on dining', '3% on entertainment', 'No foreign transaction fees'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone-savor',
    rating: 4.8, bestForTag: 'dining rewards', headlineStat: { value: '3%', label: 'cash back on dining' }, ctaLabel: 'Earn my dining rewards',
  },
  {
    id: 'card-chase-freedom-rise', category: 'card', name: 'Chase Freedom Rise',
    blurb: 'Build credit with a simple, no-fee card from a major bank.',
    highlights: ['No annual fee', '1.5% cash back on everything', 'Credit building tools', 'Automatic credit line review'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/chase-rise',
    rating: 4.6, bestForTag: 'flat-rate cash back', headlineStat: { value: '1.5%', label: 'cash back on everything' }, ctaLabel: 'Build my credit history',
  },
  {
    id: 'card-bofa-customized', category: 'card', name: 'Bank of America Customized Cash Rewards',
    blurb: 'Choose your 3% cash-back category — great for recent grads.',
    highlights: ['No annual fee', '3% in category of your choice', 'Online banking bonus', 'Preferred Rewards boost'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/bofa-customized',
    rating: 4.6, bestForTag: 'custom rewards', headlineStat: { value: '3%', label: 'chosen-category rewards' }, ctaLabel: 'Choose my rewards card',
  },

  // === Budgeting ===
  {
    id: 'budgeting-ynab', category: 'budgeting', name: 'YNAB (You Need A Budget)',
    blurb: 'Zero-based budgeting that helps you give every dollar a job.',
    highlights: ['$14.99/mo (free for students 1 year)', 'Zero-based budgeting method', 'Bank sync + goal tracking', 'Best-in-class teaching content'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/ynab',
    rating: 4.8, bestForTag: 'hands-on budgeters', headlineStat: { value: '1 year', label: 'free for students' }, ctaLabel: 'Start my budget',
  },
  {
    id: 'budgeting-everydollar', category: 'budgeting', name: 'EveryDollar',
    blurb: 'Simple, free zero-based budget app from Ramsey Solutions.',
    highlights: ['Free plan available', 'Quick monthly budget setup', 'Clean, beginner-friendly UI', 'Premium adds bank sync'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/everydollar',
    rating: 4.6, bestForTag: 'free budget setup', headlineStat: { value: '$0', label: 'starter plan' }, ctaLabel: 'Make my first budget',
  },
  {
    id: 'budgeting-monarch', category: 'budgeting', name: 'Monarch Money',
    blurb: 'All-in-one budgeting and net-worth tracking — a Mint replacement.',
    highlights: ['$14.99/mo (or $99.99/yr)', 'Tracks all accounts in one place', 'Net worth + investment tracking', 'Couples-friendly shared budgets'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/monarch',
    rating: 4.7, bestForTag: 'all-in-one tracking', headlineStat: { value: '$99.99', label: 'annual plan' }, ctaLabel: 'Track my money',
  },
  {
    id: 'budgeting-rocketmoney', category: 'budgeting', name: 'Rocket Money',
    blurb: 'Free app that tracks spending and cancels unwanted subscriptions.',
    highlights: ['Free plan available', 'Finds & cancels subscriptions', 'Bill negotiation service', 'Spending alerts'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/rocketmoney',
    rating: 4.6, bestForTag: 'subscription cleanup', headlineStat: { value: '$0', label: 'free plan' }, ctaLabel: 'Find my subscriptions',
  },

  // === Investing ===
  {
    id: 'investing-acorns', category: 'investing', name: 'Acorns',
    blurb: 'Automatically invests your spare change into diversified ETFs.',
    highlights: ['$3/mo starter plan', 'Round-up investing on autopilot', 'Hands-off ETF portfolios', 'Great for first-time investors'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/acorns',
    rating: 4.6, bestForTag: 'automatic investing', headlineStat: { value: '$3/mo', label: 'starter plan' }, ctaLabel: 'Invest my spare change',
  },
  {
    id: 'investing-betterment', category: 'investing', name: 'Betterment',
    blurb: 'Robo-advisor that builds and rebalances a portfolio for you.',
    highlights: ['0.25% annual AUM fee', 'Automatic rebalancing', 'Tax-loss harvesting', 'Goal-based investing'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/betterment',
    rating: 4.7, bestForTag: 'hands-off portfolios', headlineStat: { value: '0.25%', label: 'annual advisory fee' }, ctaLabel: 'Automate my investing',
  },
  {
    id: 'investing-m1', category: 'investing', name: 'M1 Finance',
    blurb: 'Build a custom "pie" of stocks and ETFs with automated investing.',
    highlights: ['No management fee', 'Customizable portfolio pies', 'Automated deposits & rebalancing', 'Fractional shares'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/m1',
    rating: 4.6, bestForTag: 'custom ETF pies', headlineStat: { value: '$0', label: 'management fee' }, ctaLabel: 'Build my portfolio',
  },
  {
    id: 'robo-betterment', category: 'robo', name: 'Betterment',
    blurb: 'Robo-advisor that builds and rebalances a portfolio for you.',
    highlights: ['0.25% annual AUM fee', 'Automatic rebalancing', 'Tax-loss harvesting', 'Goal-based investing'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/betterment-robo',
    rating: 4.8, bestForTag: 'hands-off portfolios', headlineStat: { value: '0.25%', label: 'annual advisory fee' }, ctaLabel: 'Automate my investing',
  },
  {
    id: 'robo-wealthfront', category: 'robo', name: 'Wealthfront Automated Investing',
    blurb: 'A hands-off robo-advisor with diversified portfolios and tax-aware features.',
    highlights: ['0.25% annual advisory fee', '$500 minimum', 'Automatic rebalancing', 'Tax-loss harvesting'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/wealthfront-investing',
    rating: 4.8, bestForTag: 'tax-aware automation', headlineStat: { value: '0.25%', label: 'annual advisory fee' }, ctaLabel: 'Start automated investing',
  },
  {
    id: 'robo-schwab-intelligent', category: 'robo', name: 'Schwab Intelligent Portfolios',
    blurb: 'Automated ETF portfolios from a major brokerage with no advisory fee.',
    highlights: ['$5,000 minimum', '$0 advisory fee', 'Automatic rebalancing', 'Broad ETF portfolios'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/schwab-intelligent-portfolios',
    rating: 4.6, bestForTag: 'established brokerage users', headlineStat: { value: '$0', label: 'advisory fee' }, ctaLabel: 'Compare automated portfolios',
  },

  // === Insurance ===
  {
    id: 'insurance-lemonade', category: 'insurance', name: 'Lemonade Renters Insurance',
    blurb: 'Renters coverage in minutes from an app, starting around $5/mo.',
    highlights: ['From ~$5/mo', 'Sign up in under 2 minutes', 'Fast, app-based claims', 'Covers theft, damage & liability'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/lemonade',
    rating: 4.7, bestForTag: 'renters coverage', headlineStat: { value: '~$5/mo', label: 'starter coverage' }, ctaLabel: 'Protect my apartment',
  },
  {
    id: 'insurance-policygenius', category: 'insurance', name: 'Policygenius',
    blurb: 'Compare quotes from top insurers for life, renters, and more.',
    highlights: ['Free comparison marketplace', 'Multiple carriers in one place', 'Licensed agent support', 'No-pressure shopping'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/policygenius',
    rating: 4.6, bestForTag: 'quote comparison', headlineStat: { value: '$0', label: 'quote marketplace' }, ctaLabel: 'Compare my quotes',
  },
  {
    id: 'insurance-fabric', category: 'insurance', name: 'Fabric by Gerber Life',
    blurb: 'Affordable term life insurance built for young adults and parents.',
    highlights: ['Term life from a few dollars/mo', 'Apply online in minutes', 'No medical exam for many applicants', 'Free will & beneficiary tools'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fabric',
    rating: 4.6, bestForTag: 'young families', headlineStat: { value: 'Minutes', label: 'online application' }, ctaLabel: 'Check my coverage',
  },

  // === Checking ===
  {
    id: 'checking-capitalone-money', category: 'checking', name: 'Capital One MONEY Teen Checking',
    blurb: 'A no-fee student-friendly checking account with a strong mobile app.',
    highlights: ['$0 monthly fee', 'No minimum balance', 'Debit card included', '70,000+ fee-free ATMs'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone-money',
    rating: 4.7, bestForTag: 'fee-free student banking', headlineStat: { value: '$0', label: 'monthly fee' }, ctaLabel: 'Open student checking',
  },
  {
    id: 'checking-chase-college', category: 'checking', name: 'Chase College Checking',
    blurb: 'A student checking account with broad branch access and easy direct deposit.',
    highlights: ['$0 monthly service fee while eligible', 'Large branch network', 'Zelle access', 'Strong mobile app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/chase-college-checking',
    rating: 4.6, bestForTag: 'branch access', headlineStat: { value: '$0', label: 'eligible student fee' }, ctaLabel: 'Check eligibility',
  },
  {
    id: 'checking-discover-cashback', category: 'checking', name: 'Discover Cashback Debit',
    blurb: 'A no-fee checking account that earns cash back on debit card purchases.',
    highlights: ['1% cash back on eligible debit purchases', '$0 monthly fee', 'No minimum deposit', '60,000+ no-fee ATMs'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/discover-cashback-debit',
    rating: 4.8, bestForTag: 'debit rewards', headlineStat: { value: '1%', label: 'eligible debit cash back' }, ctaLabel: 'Earn debit rewards',
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
export function productsForCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
