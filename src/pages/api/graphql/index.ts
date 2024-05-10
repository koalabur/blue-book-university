// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

// Queries
import Student from "@/hooks/graphql/query/Student";
import Students from "@/hooks/graphql/query/Students";
import Teacher from "@/hooks/graphql/query/Teacher";
import Teachers from "@/hooks/graphql/query/Teachers";
import Class from "@/hooks/graphql/query/Class";
import Tests from "@/hooks/graphql/query/Tests";
import CreatedBy from "@/hooks/graphql/query/CreatedBy";
import ClassInfo from "@/hooks/graphql/query/ClassInfo";
import Test from "@/hooks/graphql/query/Test";
// Docs: https://vercel.com/docs/concepts/functions/serverless-functions

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      # RootQuery
      type Query {
        student(id: ID!): student
        studentTest(id: ID!): student
        students: [student]
        teacher(id: ID!): teacher
        teachers: [teacher]
        tests: [tests]
      }
      # inside student and students from RootQuery
      type student {
        _id: ID
        firstName: String
        lastName: String
        email: String
        tests: [tests]
        class(id: ID!): class
        test(id: ID!): test
      }
      # inside teacher and teachers from RootQuery
      type teacher {
        _id: ID
        firstName: String
        lastName: String
        email: String
        tests: [tests]
      }
      # inside student > tests from "type student"
      type class {
        _id: ID
        class: String
        type: String
        tests: [tests]
      }
      # inside student > test from "type student"
      type test {
        _id: ID
        classId: ID
        configuration: [ConfigurationDetails]
        createdBy: [CreatedByDetails]
        testName: String
        desc: String
      }
      # inside student > tests from "type student"
      # inside teacher > tests from "type teacher"
      # inside class > tests from "type class"
      type tests {
        _id: ID
        classInfo: [ClassInfoDetails]
        configuration: [ConfigurationDetails]
        createdBy: [CreatedByDetails]
        testName: String
        desc: String
      }
      # inside tests > configuration from "type tests"
      type ConfigurationDetails {
        type: String
        question: String
        answer: String
        options: [String]
      }
      # inside tests > createdBy from "type tests"
      type CreatedByDetails {
        _id: ID
        firstName: String
        lastName: String
        email: String
      }
      # inside tests > class from "type tests"
      type ClassInfoDetails {
        _id: ID
        class: String
        type: String
      }
    `,
    resolvers: {
      Query: {
        student: (parent, args) => Student(parent, args),
        studentTest: (parent, args) => Student(parent, args),
        students: (parent, args) => Students(parent, args),
        teacher: (parent, args) => Teacher(parent, args),
        teachers: (parent, args) => Teachers(parent, args),
        tests: () => Tests(),
      },
      student: {
        tests: (parent, args) => Class(parent, args),
        test: (parent, args) => Test(parent, args),
      },
      tests: {
        createdBy: (parent, args) => CreatedBy(parent, args),
        classInfo: (parent, args) => ClassInfo(parent, args),
      },
      test: {
        createdBy: (parent, args) => CreatedBy(parent, args),
      },
      class: {
        tests: () => Tests(),
      },
    },
  }),
});
