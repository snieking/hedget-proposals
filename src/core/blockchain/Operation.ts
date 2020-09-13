export class Operation {
  public name: string;

  public args: unknown[];

  constructor(name: string, args: unknown[]) {
    this.name = name;
    this.args = args;
  }
}
