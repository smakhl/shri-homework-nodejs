type SmartHomeEvent = {
    type: string
}

type ApiResponse = {
    events?: SmartHomeEvent[]
}