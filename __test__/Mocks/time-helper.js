export const stubDate = fixedDate => {
  let _originalDate;

  beforeAll(() => {
    _originalDate = Date;

    Date = class extends Date {
      constructor() {
        super();

        return fixedDate;
      }
    };
  });

  afterAll(() => {
    Date = _originalDate;
  });
};
