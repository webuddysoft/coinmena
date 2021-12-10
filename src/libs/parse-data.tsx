import {Repository, Developer, PopularRepository, Contributer} from "./data"

export const parseRepositoryResult = (data: Array<any>) : Array<Repository> => {
      return data.map((item: any) => ({
                        repositoryName: item['repositoryName'],
                        username: item['username'],
                        url: item['url'],
                        totalStars: item['totalStars'],
                        starsSince: item['starsSince'],
                        since: item['since'],
                        rank: item['rank'],
                        languageColor: item['languageColor'],
                        language: item['language'],
                        forks: item['forks'],
                        description: item['description'],
                        builtBy: item['builtBy'].map((bItem: any) => ({
                          username: bItem['username'],
                          url: bItem['url'],
                          avatar: bItem['avatar']
                        }))
                      }))
}

export const parseDeveloperResult = (data: Array<any>) : Array<Developer> => {
    return data.map((item: any) => ({
                      name: item['name'],
                      username: item['username'],
                      rank: item['rank'],
                      since: item['since'],
                      url: item['url'],
                      avatar: item['avatar'],
                      popularRepository: item['popularRepository']
                    }))
}
