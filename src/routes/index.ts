import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (filename: string): string | undefined => {
	const file = filename.split(".").shift();
	return file;
};

readdirSync(PATH_ROUTER).filter((filename: string) => {
	const cleanName = cleanFileName(filename);
	if (cleanName !== "index") {
		console.log(`loading route.......................... /${cleanName}`);
		import(`./${cleanName}`).then((moduleRouter) => {
			router.use(`/${cleanName}`, moduleRouter.router);
		});
	}
});

export { router };
