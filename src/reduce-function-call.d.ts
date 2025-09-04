declare module 'reduce-function-call' {
  export default function reduceFunctionCall(
    value: string,
    name: string,
    callback: (body: string) => string,
  ): string;
}
