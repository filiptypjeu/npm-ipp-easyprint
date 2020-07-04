# ipp-easyprint
This NPM package allows for easy interfacing to a network printer via IPP.

This package is build upon the [ipp](https://www.npmjs.com/package/ipp) package and my own [TS types](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/ipp/index.d.ts).

Notice that this package was mainly built for my own needs, and it is therefore not thouroughly tested.

## Usage
Set up the printer by providing the HTTP address to the printer.
```ts
const printer = new IPPPrinter("http://myprinter.url");
```

Fetch the current status of the printer. Specific attributes can be requested, and all available attributes can be found at
<https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/ipp/index.d.ts>
or
<https://www.iana.org/assignments/ipp-registrations/ipp-registrations.xhtml#ipp-registrations-2>.
Get all available attributes by providing "all".

This is a helpful method for getting insight in which job attributes the printer supports.
```ts
const status: object = await printer.printerStatus("all");
```


Setting up the info about a print job. One can either provide a path to the file in disk, or a Buffer. The available job attributes can be found at the URLs above.
```ts
const job: IPrintJobInfo = {
  // buffer?: Buffer,
  fileType: "application/pdf",
  jobName: "my awesome job name",
  jobAttributes: {
    "page-ranges": "4-7",
    "print-quality": "high",
    sides: "two-sided-long-edge",
    media: "iso-a4",
  },
  path: "path to file on disk",
  username: "username",
}
```

The job attributes that you printer supports can be found at `status["job-creation-attributes-supported"]` and supported and default values for specific attributes, for example the 'sides' attribute, can be found at `status["sides-supported"]` and `status["sides-default"]`.

The fileType defaults to "application/octet-stream", which signals the printer to try to figure out the file type itself. The most common file types are probably "image/jpeg", "image/png", "text/plain" and "application/pdf".

Send a print job to the printer
```ts
const jobId: number = await printFile(job);
```

Request that the printer identifies itself by beeping and flashing. Available idetification methods are 'display', 'flash', 'sound' and 'speak', but not all printers support all actions.
```ts
await printer.identify(status["identify-actions-supported"]);
```
