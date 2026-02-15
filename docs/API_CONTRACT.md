# Jugnu API Contract (Phase 1)

All API responses are JSON. Successful responses use an envelope with `success: true`. Errors use `success: false` with a consistent `error` object.

**Success Envelope**
```json
{
  "success": true,
  "data": {}
}
```

**Error Envelope**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": {}
  },
  "message": "Human-readable message"
}
```

## Auth

`POST /api/auth/register`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password"
}
```
```json
{
  "success": true,
  "data": {
    "token": "jwt",
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "currentPhase": "CALM"
    }
  }
}
```

`POST /api/auth/login`
```json
{
  "email": "jane@example.com",
  "password": "password"
}
```
```json
{
  "success": true,
  "data": {
    "token": "jwt",
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "currentPhase": "CALM"
    }
  }
}
```

## User

`GET /api/user/me`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "currentPhase": "CALM",
    "createdAt": "2026-02-15T00:00:00.000Z"
  }
}
```

`POST /api/user/phase`
```json
{
  "phase": "STRESS"
}
```
```json
{
  "success": true,
  "data": {
    "message": "Phase set to STRESS"
  }
}
```

## Dashboard

`GET /api/dashboard`
```json
{
  "success": true,
  "data": {
    "timeOfDay": "morning",
    "userName": "Jane Doe",
    "currentPhase": "CALM",
    "reflectionPrompt": {
      "text": "What helped you feel steady today?"
    },
    "insight": {
      "trend": "STABLE",
      "summary": "Your mood has been fairly steady this week. Consistency can be calming.",
      "averageMood": 3.4
    },
    "dailyMessage": {
      "text": "Hold onto this steadiness. You're doing well.",
      "source": "seed",
      "generatedAt": "2026-02-15T00:00:00.000Z"
    },
    "weeklyTrend": [
      { "day": "Mon", "mood": 3 },
      { "day": "Tue", "mood": 2 },
      { "day": "Wed", "mood": 3 },
      { "day": "Thu", "mood": 4 },
      { "day": "Fri", "mood": 4 },
      { "day": "Sat", "mood": 3 },
      { "day": "Sun", "mood": 4 }
    ]
  }
}
```

## Mood

`POST /api/mood`
```json
{
  "value": 4
}
```
```json
{
  "success": true,
  "data": {
    "id": 1,
    "value": 4,
    "userId": 1,
    "date": "2026-02-15T00:00:00.000Z"
  }
}
```

`GET /api/mood`
```json
{
  "success": true,
  "data": [
    { "id": 1, "value": 4, "userId": 1, "date": "2026-02-15T00:00:00.000Z" }
  ]
}
```

`GET /api/mood/weekly`
```json
{
  "success": true,
  "data": [
    { "id": 1, "value": 4, "userId": 1, "date": "2026-02-15T00:00:00.000Z" }
  ]
}
```

## Daily Message

`GET /api/message/daily`
```json
{
  "success": true,
  "data": {
    "text": "Hold onto this steadiness. You're doing well.",
    "phase": "CALM",
    "generatedAt": "2026-02-15T00:00:00.000Z",
    "source": "seed"
  }
}
```

## Reflection

`GET /api/reflection/prompt`
```json
{
  "success": true,
  "data": {
    "prompt": "What helped you feel steady today?"
  }
}
```

`POST /api/reflection`
```json
{
  "prompt": "What helped you feel steady today?",
  "answer": "A short walk in the evening."
}
```
```json
{
  "success": true,
  "data": {
    "id": 1,
    "prompt": "What helped you feel steady today?",
    "answer": "A short walk in the evening.",
    "date": "2026-02-15T00:00:00.000Z"
  }
}
```

`GET /api/reflection`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "prompt": "What helped you feel steady today?",
      "answer": "A short walk in the evening.",
      "date": "2026-02-15T00:00:00.000Z"
    }
  ]
}
```
