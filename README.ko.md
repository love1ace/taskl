# Taskl

**Taskl**은 비동기 작업을 효과적으로 제어하고 CLI 애플리케이션에서 로그를 관리할 수 있는 라이브러리 입니다.

![npm](https://img.shields.io/npm/v/taskl)
![license](https://img.shields.io/npm/l/taskl)

![taskl](./taskl.gif)

## 설치

원하는 패키지 관리자를 사용하여 **Taskl**을 설치할 수 있습니다:

### npm

```bash
npm install taskl
```

### Yarn

```bash
yarn add taskl
```

### pnpm

```bash
pnpm add taskl
```

### Bun

```bash
bun add taskl
```

## 사용법

프로젝트에서 **Taskl**을 사용하려면 다음 단계를 따르세요:

### 1. Taskl에서 필요한 구성 요소 가져오기

먼저, `taskl` 패키지에서 `Taskl`, `Task`, `TasklOptions`를 import 합니다.

```typescript
import { Taskl, Task, TasklOptions } from 'taskl';
```

*JavaScript 사용자의 경우, 대신 `require`를 사용할 수 있습니다:*

```javascript
const { Taskl, Task, TasklOptions } = require('taskl');
```

### 2. 작업 정의하기

실행할 작업 배열을 생성합니다. 각 작업은 `text` 설명과 `Promise<void>`를 반환하는 `run` 함수를 가져야 합니다.

```typescript
const tasks: Task[] = [
  {
    text: '데이터베이스에 연결 중',
    run: async () => {
      // 데이터베이스에 연결하는 실제 로직
      await connectToDatabase();
    },
  },
  {
    text: 'API 서버 시작 중',
    run: async () => {
      // 서버를 시작하는 실제 로직
      await startApiServer();
    },
  }
];
```

*JavaScript 사용자의 경우:*

```javascript
const tasks = [
  {
    text: '데이터베이스에 연결 중',
    run: async () => {
      // 데이터베이스에 연결하는 실제 로직
      await connectToDatabase();
    },
  },
  {
    text: 'API 서버 시작 중',
    run: async () => {
      // 서버를 시작하는 실제 로직
      await startApiServer();
    },
  }
];
```

**Task 인터페이스:**

- `text`: 작업에 대한 설명.
- `run`: 작업을 수행하는 비동기 함수.

**팁:** 각 `run` 함수가 자체적으로 오류를 적절히 처리하여 Taskl이 작업 흐름을 원활하게 관리할 수 있도록 하세요. 예를 들어:

```javascript
const tasks = [
  {
    text: '데이터베이스에 연결 중',
    run: async () => {
      try {
        await connectToDatabase();
      } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
        throw error; // Taskl이 실패를 처리할 수 있도록 재전파
      }
    },
  },
  // ... 다른 작업
];
```

### 3. TasklOptions 설정

작업과 프로세스 중 표시할 메시지를 포함하여 Taskl의 옵션을 구성합니다.

```typescript
const options: TasklOptions = {
  tasks: tasks,
  startMessage: '🔄 프로세스를 시작합니다',
  successMessage: '프로세스가 성공적으로 완료되었습니다.',
  failedMessage: '프로세스 중 오류가 발생했습니다.'
};
```

*JavaScript 사용자의 경우:*

```javascript
const options = {
  tasks: tasks,
  startMessage: '🔄 프로세스를 시작합니다',
  successMessage: '프로세스가 성공적으로 완료되었습니다.',
  failedMessage: '프로세스 중 오류가 발생했습니다.'
};
```

**옵션 설명:**

- `tasks`: 순차적으로 실행될 `Task` 객체들의 배열.
- `startMessage`: 작업 실행이 시작될 때 표시되는 메시지.
- `successMessage`: 모든 작업이 성공적으로 완료된 후 표시되는 메시지.
- `failedMessage`: 작업 중 하나라도 실패할 경우 표시되는 메시지.

### 4. Taskl 인스턴스 생성 및 작업 실행

구성된 옵션으로 Taskl을 인스턴스화하고 작업을 실행합니다.

```typescript
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);
```

*JavaScript 사용자의 경우:*

```javascript
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);
```

**다음과 같은 일이 발생합니다:**

- Taskl은 `startMessage`를 시안 색상으로 표시합니다.
- 각 작업이 순차적으로 실행되며, 작업 설명과 함께 스피너가 표시됩니다.
- 작업이 성공적으로 완료되면 성공 스피너가 나타납니다.
- 작업이 실패하면 실패 스피너가 표시되고, 마지막에 `failedMessage`가 표시됩니다.
- 마지막으로, Taskl은 전체 실행 시간을 표시합니다.

### 전체 예제

모든 단계를 통합한 전체 예제는 다음과 같습니다:

```typescript
import { Taskl, Task, TasklOptions } from 'taskl';

// 작업 정의
const tasks: Task[] = [
  {
    text: '데이터베이스에 연결 중',
    run: async () => {
      await connectToDatabase();
    },
  },
  {
    text: 'API 서버 시작 중',
    run: async () => {
      await startApiServer();
    },
  }
];

// Taskl 옵션 설정
const options: TasklOptions = {
  tasks: tasks,
  startMessage: '🔄 프로세스를 시작합니다',
  successMessage: '프로세스가 성공적으로 완료되었습니다.',
  failedMessage: '프로세스 중 오류가 발생했습니다.'
};

// Taskl 인스턴스 생성 및 작업 실행
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);

// 예제 함수들 (실제 로직으로 대체하세요)
async function connectToDatabase() {
  // 비동기 데이터베이스 연결 시뮬레이션
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
}

async function startApiServer() {
  // 비동기 서버 시작 시뮬레이션
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
}
```

*JavaScript 사용자의 경우:*

```javascript
const { Taskl, Task, TasklOptions } = require('taskl');

// 작업 정의
const tasks = [
  {
    text: '데이터베이스에 연결 중',
    run: async () => {
      await connectToDatabase();
    },
  },
  {
    text: 'API 서버 시작 중',
    run: async () => {
      await startApiServer();
    },
  }
];

// Taskl 옵션 설정
const options = {
  tasks: tasks,
  startMessage: '🔄 프로세스를 시작합니다',
  successMessage: '프로세스가 성공적으로 완료되었습니다.',
  failedMessage: '프로세스 중 오류가 발생했습니다.'
};

// Taskl 인스턴스 생성 및 작업 실행
const taskl = new Taskl(options);
taskl.runTasks().catch(console.error);

// 예제 함수들 (실제 로직으로 대체하세요)
async function connectToDatabase() {
  // 비동기 데이터베이스 연결 시뮬레이션
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function startApiServer() {
  // 비동기 서버 시작 시뮬레이션
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
```

**예제 실행하기:**

1. 프로젝트에 **Taskl**이 설치되어 있는지 확인하세요.
2. 예제의 `connectToDatabase` 및 `startApiServer` 함수를 실제 로직으로 교체하세요.
3. **TypeScript 사용자:**
   - `tsc`를 사용하여 TypeScript 파일을 컴파일하거나 `ts-node`와 같은 TypeScript 실행기를 사용하여 실행하세요.
   - 컴파일된 경우 `node`를 사용하여 스크립트를 실행하거나, TypeScript 실행기를 사용하는 경우 직접 실행하세요.
4. **JavaScript 사용자:**
   - 스크립트를 `node`를 사용하여 실행하세요:
     ```bash
     node your-script.js
     ```

콘솔에서 진행 상황 표시기, 성공/실패 메시지 및 전체 실행 시간을 포함한 출력이 표시됩니다.

## 기여

**Taskl**에 대한 기여를 환영합니다! 버그를 보고하거나, 기능 향상을 제안하거나, 풀 리퀘스트를 제출하는 등 여러분의 의견을 소중히 여깁니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

질문, 제안 또는 피드백이 있으시면 [love1ace](mailto:lovelacedud@gmail.com)으로 연락 주세요.