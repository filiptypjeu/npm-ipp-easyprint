import printerInfo from "./variables/variables";
import { IPPPrinter, IStatus } from "./../index";

let printer: IPPPrinter;

test("init printer", () => {
    printer = new IPPPrinter(printerInfo.url);
});

test("printer attributes", async () => {
    const status: IStatus = await printer.printerStatus("all");
    expect(status).toBeTruthy();
    expect(status["printer-up-time"]).toBeGreaterThan(0);
    expect(status["printer-make-and-model"]).toEqual(printerInfo.model);
    expect(status["printer-dns-sd-name"]).toEqual(printerInfo.dnsName);
});
