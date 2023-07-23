export const getHashtags = (note: string) => {
    const regexp: RegExp = /(?<=(?<!\S)#)[A-Z]+/gi
    const hashtags: RegExpMatchArray | null = note.match(regexp)

    return hashtags
}