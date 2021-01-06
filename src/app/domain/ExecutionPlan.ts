export interface ExecutionPlan {
  id: string
  actions: [{
    name: string
    type: string
  }]
}
