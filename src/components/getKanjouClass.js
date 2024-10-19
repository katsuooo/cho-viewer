/**
 * 
 * 
 * 勘定値による色分け
 * 
 * 
 * 
 */


function getKanjouClass(kanjou) {
   console.log(kanjou)
 switch (kanjou) {
   case '預金':
       console.log('預金match')
     return 'bg-deposit';
   case '現金':
     return 'bg-cash';
   case '事業主貸':
     return 'bg-owner-loan';
   case '事業主借':
     return 'bg-owner-borrow';
   case '売掛金':
     return 'bg-receivable';
   case '未払金':
     return 'bg-payable';
   case '雑費':
     return 'bg-misc';
   case '工具器具備品':
     return 'bg-tools';
   case '減価償却費':
     return 'bg-depreciation';
   case '消耗品費':
     return 'bg-supplies';
   case '会議費':
     return 'bg-meeting';
   // その他の勘定科目も追加可能
   default:
     return 'bg-deposit';
 }
}

export default getKanjouClass