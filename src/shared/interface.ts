export interface IsStudent {
  student: {
    __typename: string;
    tests: Array<TestsDetails>;
  };
}

export interface TestsDetails {
  __typename: string;
  _id: string;
  classInfo: Array<ClassInfoDetails>;
  createdBy: Array<CreatedByDetails>;
  desc: string;
  testName: string;
}

interface ClassInfoDetails {
  __typename: string;
  _id: string;
  class: string;
}

interface CreatedByDetails {
  __typename: string;
  _id: string;
  firstName: string;
  lastName: string;
}

export interface StudentTest {
  studentTest: {
    __typename: string;
    test: {
      __typename: string;
      _id: string;
      configuration: Array<ConfigurationDetails>;
      testName: string;
    }
  }
}

interface ConfigurationDetails {
  __typename: string;
  answer: string;
  options: Array<string>;
  question: string;
  type: string;
}