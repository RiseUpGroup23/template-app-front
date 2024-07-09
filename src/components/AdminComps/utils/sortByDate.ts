export default function sortByDate(arrayOfObjects: any[]): any[] {
    function compareDates(a: any, b: any): number {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    }

    arrayOfObjects.sort(compareDates);
    return arrayOfObjects;
}