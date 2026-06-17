export function budgetSplit(takeHomeMonthly: number) {
  return {
    needs: takeHomeMonthly * 0.5,
    wants: takeHomeMonthly * 0.3,
    savings: takeHomeMonthly * 0.2,
  }
}
