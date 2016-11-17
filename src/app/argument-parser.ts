import * as commander from 'commander'

export interface Arguments extends commander.ICommand {}

export default function parseArguments(...argv: string[]): Arguments {
    return commander
        .version(process.versions.electroPub.toString())
        .option('--enable-logging', '')
        .allowUnknownOption(true)  // electron stuff
        .parseExpectedArgs(['[path]'])
        .parse(argv)
}
