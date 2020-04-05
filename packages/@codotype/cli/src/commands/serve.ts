import * as path from "path";
import chalk from "chalk";
// import { server } from "@codotype/api";
import { spawn } from "child_process";
import { CodotypeNodeRuntime } from "@codotype/runtime";

async function serve(options: any) {
  // Logs start message
  console.log(`\nStarting ${chalk.blue(`codotype serve`)}...`);

  // // // //
  // CLEANUP - wrap this in a try/catch
  // CLEANUP - this type of checking will be necessary in a number of places
  // This logic should be abstracted & generalized as much as possible
  // Pulls in requisite paths for codotype runtime
  const generatorMetaPath = path.resolve(
    process.cwd(),
    "./codotype-generator.json"
  ); // CLEANUP - constantize MAGIC STRING
  // console.log(`the doctor says ${chalk.green(`this generator's metadata loaded correctly`)}`)

  // Invoke runtime directly with parameters
  const runtime = new CodotypeNodeRuntime();

  // Registers this generator via relative path
  try {
    runtime.registerGenerator({
      absolute_path: process.cwd(),
      module_path: false,
      relative_path: false,
    });
  } catch (err) {
    throw err;
    return;
  }

  //
  // // // //

  console.log("Starting API server...");

  // Starts server
  const port: number = Number(process.env.PORT) || 9090;
  const generateBuildId: boolean = false;

  // const app = server({
  //   port,
  //   runtime,
  //   generateBuildId,
  //   zipBuild: false,
  //   uploadZipToS3: false,
  // });

  // app.listen(port, () => {
  //   console.log("Started API server...");
  //   // console.log(`Express is running on port ${port}`)
  // });

  // // // //
  // CLEANUP - running a user interface service will necessary in an number of places
  // This process should be abstracted as much as possible

  // Generates path from here to node_modules/@codotype/cli-ui
  const uiPath = path.resolve(__dirname, "../node_modules/@codotype/cli-ui");

  // CLEANUP - add cleaner output message here
  console.log("Starting UI Webpack server...");

  // Assembles arguments to start the UI server
  let args = [
    "--cwd",
    uiPath,
    "run",
    "serve",
    "--generator_path",
    process.cwd(),
  ];
  const uiProc = spawn("yarn", args);

  uiProc.stdout.on("data", (data) => console.log(data.toString()));

  // uiProc.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });

  uiProc.on("close", (code) => {
    // console.log('CLOSED')
    // process.exit(1)
  });

  //
  // // // //
}

export const serveCommand = (...args) => {
  return serve({ ...args }).catch((err) => {
    console.log(chalk.red("codotype cli error"));
    console.log(chalk.yellow("generator not found in local directory"));
    console.log(err);
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1);
    }
  });
};
