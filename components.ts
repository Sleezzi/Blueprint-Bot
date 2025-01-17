export class Log {
	constructor(...args: Array<any>) {
		args.forEach((log: any) => {
			if (log === "" || log  === "\n") {
				console.log(" ");
			} else {
				if (typeof log === "string") {
					log = ParseColor(log);
				}
				console.log(`  ↪ [\x1b[90m${(new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate())}/${(new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1)}/${(new Date().getFullYear() < 10 ? `0${new Date().getFullYear()}` : new Date().getFullYear())} ${(new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours())}:${(new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes())}:${(new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds())}\x1b[0m] ${log}\x1b[0m`);
			}
		});
	}
}

export function ParseAppOptionsTypes(type: string) {
	if (type.toLowerCase() === "string") return 3;
	if (type.toLowerCase() === "interger") return 4;
	if (type.toLowerCase() === "boolean") return 5;
	if (type.toLowerCase() === "user") return 6;
	if (type.toLowerCase() === "channel") return 7;
	if (type.toLowerCase() === "role") return 8;
	if (type.toLowerCase() === "mentionnable") return 9;
	if (type.toLowerCase() === "number" || type.toLowerCase() === "num") return 10;
	if (type.toLowerCase() === "attachement") return 11;
	console.log(`${type} is not a type of option's commands`);
	return 3;
}

export function ParseAppType(type: string) {
	if (type === "chatinput") return 1;
	if (type === "user") return 2;
	if (type === "message") return 3;
	return 1;
}

export function ParseColor(log: string) {
	return log
	.replace(/\%reset\%/g, "\x1b[0m")
	.replace(/\%red\%/g, "\x1b[31m")
	.replace(/\%green\%/g, "\x1b[32m")
	.replace(/\%yellow\%/g, "\x1b[33m")
	.replace(/\%blue\%/g, "\x1b[34m")
	.replace(/\%purpule\%/g, "\x1b[35m")
	.replace(/\%aqua\%/g, "\x1b[36m")
	.replace(/\%gray\%/g, "\x1b[90m");
}

export function ParsePermissions(permission: string) {
	if (permission === "createinstantinvite") return 1;
	if (permission === "kickmembers" || permission === "kick" || permission === "kicks") return 2;
	if (permission === "banmembers" || permission === "ban") return 4;
	if (permission === "administrator" || permission === "admin") return 8;
	if (permission === "managechannels" || permission === "managechannel") return 16;
	if (permission === "manageguild") return 32;
	if (permission === "addreactions" || permission === "addreaction" || permission === "addreact" || permission === "react") return 64;
	if (permission === "viewauditlog") return 128;
	if (permission === "priorityspeaker") return 256;
	if (permission === "stream") return 512;
	if (permission === "viewchannel") return 1_024;
	if (permission === "sendmessages" || permission === "sendmessage" || permission === "sendmsg") return 2_048;
	if (permission === "sendttsmessages" || permission === "sendtts" || permission === "sendttsmessage") return 4_096;
	if (permission === "managemessages" || permission === "managemessage") return 8_192;
	if (permission === "embedlinks" || permission === "embedlink") return 16_384;
	if (permission === "attachfiles" || permission === "attachfile" || permission === "attachefiles" || permission === "attachefile") return 32_768;
	if (permission === "readmessagehistory") return 65_536;
	if (permission === "mentioneveryone") return 131_072;
	if (permission === "useexternalemojis") return 262_144;
	if (permission === "viewguildinsights") return 524_288;
	if (permission === "connect") return 1_048_576;
	if (permission === "speak") return 2_097_152;
	if (permission === "mutemembers" || permission === "mute") return 4_194_304;
	if (permission === "deafenmembers" || permission === "deafenmember") return 8_388_608;
	if (permission === "movemembers" || permission === "movemember") return 16_777_216;
	if (permission === "usevad") return 33_554_432;
	if (permission === "changenickname" || permission === "nick") return 67_108_864;
	if (permission === "managenicknames" || permission === "managenickname" || permission === "managenick" || permission === "managenicks") return 134_217_728;
	if (permission === "manageroles" || permission === "managerole") return 268_435_456;
	if (permission === "managewebhooks" || permission === "managewebhook") return 536_870_912;
	if (permission === "manageemojisandstickers" || permission === "manageemoji" || permission === "manageemojis") return 1_073_741_824;
	if (permission === "manageguildexpressions") return 1_073_741_824;
	if (permission === "useapplicationcommands") return 2_147_483_648;
	if (permission === "requesttospeak") return 4_294_967_296;
	if (permission === "manageevents" || permission === "manageevent") return 8_589_934_592;
	if (permission === "managethreads" || permission === "managethread") return 17_179_869_184;
	if (permission === "createpublicthreads" || permission === "createpublicthread") return 34_359_738_368;
	if (permission === "createprivatethreads" || permission === "createprivatethread") return 68_719_476_736
	if (permission === "useexternalstickers" || permission === "useexternalsticker") return 137_438_953_472;
	if (permission === "sendmessagesinthreads" || permission === "sendmessageinthread" || permission === "sendmessagesinthread" || permission === "sendmessageinthreads") return 274_877_906_944;
	if (permission === "useembeddedactivities" || permission === "useembeddedactivity") return 549_755_813_888;
	if (permission === "viewcreatormonetizationanalytics" || permission === "viewadanalytics") return 2_199_023_255_552;
	if (permission === "usesoundboard") return 4_398_046_511_104;
	if (permission === "sendvoicemessages" || permission === "sendvoicemessage") return 70_368_744_177_664;
	if (permission === "managemember" || permission === "moderatemembers") return 109_9511_627_776;
	return 8;
}

export function RedEyeLog() {
	new Log(`\n\n${" ".repeat(process.stdout.columns / 2)}             %red%⠤⠤⠤⠤⠤⠤%reset%
${" ".repeat((process.stdout.columns - 48) / 2)}%red%████%reset% %blue%███%reset% %purpule%████%reset%  %yellow%███%reset% %aqua%██%reset% %aqua%██%reset% %green%███%reset%      %red%⠴⠟⠛⠉⠉⠉⠉⠉⠉⠛⠻⠦%reset%
${" ".repeat((process.stdout.columns - 48) / 2)}%red%█%reset%  %red%█%reset% %blue%█%reset%   %purpule%█%reset%  %purpule%██%reset% %yellow%█%reset%    %aqua%███%reset%  %green%█%reset%      %red%⣴⠉   ⠔⠒⠒⠒⠢   ⠉⠷%reset%
${" ".repeat((process.stdout.columns - 48) / 2)}%red%████%reset% %blue%██%reset%  %purpule%█%reset%  %purpule%██%reset% %yellow%██%reset%    %aqua%█%reset%   %green%██%reset%   %red%⠐⠯    ⠸  %reset%♡%red%  ⠇    ⠽⠂%reset%
${" ".repeat((process.stdout.columns - 48) / 2)}%red%█%reset% %red%█%reset%  %blue%█%reset%   %purpule%█%reset%  %purpule%██%reset% %yellow%█%reset%     %aqua%█%reset%   %green%█%reset%      %red%⠻⠤   ⠑⠒⠒⠒⠊   ⠤⠟%reset%
${" ".repeat((process.stdout.columns - 48) / 2)}%red%█%reset%  %red%█%reset% %blue%███%reset% %purpule%████%reset%  %yellow%███%reset%   %aqua%█%reset%   %green%███%reset%      %red%⠙⠷⣤⠤⠤⠤⠤⠤⠤⣤⠾⠋%reset%
${" ".repeat(process.stdout.columns / 2)}             %red%⠉⠉⠉⠉⠉%reset%


  %green%➜%reset%  Type help to show help
  %green%➜%reset%  Type clear to clear
  %green%➜%reset%  Type restart to restart
  %green%➜%reset%  Type exit or CTRL+C to exit\n\n`)
}