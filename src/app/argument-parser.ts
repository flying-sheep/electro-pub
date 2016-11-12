import * as commander from 'commander'

export interface Arguments extends commander.ICommand {}

export default function parseArguments(...argv: string[]): Arguments {
    return commander
        .version(process.versions.electroPub.toString())
        .description('Open an epub book')
        .parseExpectedArgs(['[path]'])
        .parse(argv)
}
