package main

import "fmt"
import "sort"

type Prefecture int

type City struct {
    Prefecture Prefecture
    CityIndex int
    Year int
    ID string
}

type Cities []City

func (c Cities) Len() int {
    return len(c)
}

func (c Cities) Swap(i, j int) {
    c[i], c[j] = c[j], c[i]
}

func (c Cities) Less(i, j int) bool{
    return c[i].Year < c[j].Year
}

type ByCityIndex struct {
    Cities
}
func (b ByCityIndex) Less(i, j int) bool{
    return b.Cities[i].CityIndex < b.Cities[j].CityIndex
}

func main(){
    tmp := scanNums(2)
    _, m := tmp[0], tmp[1] //県の数と市の数
    preMap := make(map[Prefecture]Cities)
    //市の情報を取得
    for cityIndex :=0; cityIndex < m; cityIndex++{
        tmp = scanNums(2)
        p, y := Prefecture(tmp[0]), tmp[1] //県と市ができた年
        city := City{
            Prefecture: p,
            CityIndex : cityIndex,
            Year: y,
        }
        var cities Cities
        var ok bool
        if cities, ok = preMap[p]; !ok{
            cities = make(Cities, 0)
        }
        cities = append(cities, city)
        preMap[p] = cities
    }
    //県ごとに市のIDをつける
    allCities := make(Cities, 0)
    for prefecture, cities := range preMap {
        //年の順番で並び替え
        sort.Sort(cities)
        for idx, c := range cities{
            c.ID = fmt.Sprintf("%06d%06d", prefecture, idx+1)
            allCities = append(allCities, c)
        }
    }

    //表示するため市のindexで並び替える
    sort.Sort(ByCityIndex{allCities})
    for i:=0; i<len(allCities); i++{
        fmt.Printf("%s\n", allCities[i].ID)
    }
}


/**
 * １行に空白区切りで数字を読み込み
 */
func scanNums(len int) (nums []int) {
	nums = make([]int, len)
	for i := 0; i < len; i++ {
		fmt.Scan(&nums[i])
	}
	return
}
