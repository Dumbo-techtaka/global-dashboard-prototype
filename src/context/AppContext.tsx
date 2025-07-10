import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedTimezone: string;
  setSelectedTimezone: (timezone: string) => void;
  getText: (key: string) => string;
  formatDate: (dateString: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Seoul");

  // Language text mapping
  const getText = (key: string) => {
    const texts = {
      ko: {
        // Dashboard
        globalScmDashboard: "글로벌 SCM 대시보드",
        fulfillmentCenterManagement: "해외 풀필먼트 센터 통합 관리",
        inventoryStatus: "재고 현황",
        outboundStatus: "출고 현황",
        inboundSchedule: "입고 예정",
        totalStock: "총 재고",
        todayOutbound: "금일 출고",
        inboundScheduled: "입고 예정",
        vsYesterday: "전일 대비",
        next7Days: "향후 7일간",
        
        // Inventory
        centerInventory: "센터별 재고 현황",
        inventoryAlert: "재고 알림",
        skuInventory: "SKU별 재고 현황",
        availableStock: "판매 가능",
        outboundReserved: "출고 예약",
        channelReserved: "채널 예약",
        issueStock: "이슈 재고",
        country: "국가",
        center: "센터",
        productName: "상품명",
        lotNumber: "로트번호",
        expiryDate: "유통기한",
        status: "상태",
        normal: "정상",
        shortage: "부족",
        searchPlaceholder: "SKU 또는 상품명으로 검색...",
        centerSearchPlaceholder: "국가 또는 센터명으로 검색...",
        allCountries: "전체 국가",
        allCenters: "전체 센터",
        
        // Countries
        singapore: "싱가포르",
        usa: "미국",
        korea: "한국",
        
        // Centers
        sgMainCenter: "SG 메인 센터",
        usEastCenter: "US 동부 센터",
        usWestCenter: "US 서부 센터",
        
        // Alert messages
        inventoryShortage: "재고 부족",
        currentStock: "현재고",
        shortageApproaching: "재고 부족 임박",
        outOfStockIn7Days: "7일 후 품절 예상",
        salesSurge: "판매량 급증",
        last7DaysVs: "지난 7일 대비",
        
        // Outbound
        outboundAccept: "출고 접수",
        outboundComplete: "출고 완료",
        deliveryComplete: "배송 완료",
        totalOutbound: "총 출고",
        totalOf: "전체의",
        otherMarketplaces: "기타 마켓플레이스",
        avgProcessingTime: "평균 처리시간",
        ownMall: "자사몰",
        centerOutboundStatus: "센터별 출고 현황",
        channelSalesStatus: "채널별 판매 현황",
        skuOutboundDetails: "SKU별 출고 상세",
        outboundQuantity: "출고 수량",
        hourlyOutboundVolume: "시간별 출고량",
        channelOccupancyRate: "채널별 점유율",
        amazon: "아마존",
        qoo10: "Qoo10",
        
        // Inbound
        thisWeekInbound: "이번 주 입고",
        delayedCount: "지연 건수",
        completionRate: "완료율",
        last30DaysBasis: "지난 30일 기준",
        inboundFlowStatus: "입고 흐름 현황",
        koreaSupplier: "한국 공급업체",
        chinaSupplier: "중국 공급업체",
        centerTransfer: "센터 간 이동",
        destinationCenter: "목적지 센터",
        inboundScheduledList: "입고 예정 목록",
        inboundId: "입고 ID",
        inboundAlerts: "입고 관련 알림",
        inboundDelayed: "입고 지연",
        scheduledDate: "예정일",
        currentDelay: "현재 지연",
        arrivingTomorrow: "내일 도착 예정",
        prepare: "준비하기",
        inboundCompleted: "입고 완료",
        
        // Time ranges
        oneDay: "1일",
        sevenDays: "7일",
        thirtyDays: "30일",
        ninetyDays: "90일",
        
        // Timezones
        koreaTimezone: "한국 (UTC+9)",
        singaporeTimezone: "싱가포르 (UTC+8)",
        usEastTimezone: "미국 동부 (UTC-5)",
        usWestTimezone: "미국 서부 (UTC-8)",
        utcTimezone: "UTC",
        
        // Common
        urgent: "긴급",
        warning: "주의",
        information: "정보",
        items: "개",
        processing: "처리중",
        completed: "완료",
        pending: "대기",
        confirm: "확인",
        viewDetails: "상세보기",
        cases: "건",
        total: "전체",
        channels: "채널",
        outbound: "출고",
        sku: "SKU",
        salesChannel: "판매채널",
        supplier: "공급업체",
        expectedDate: "예정일",
        totalQuantity: "총 수량",
        others: "기타",
        
        // Outbound specific
        outboundDelay: "출고 지연",
        delayedOutbound: "지연 출고",
        deliveryDelay: "배송 지연",
        delayedDelivery: "지연 배송",
        avgOutboundTime: "평균 출고시간",
        avgDeliveryTime: "평균 배송시간",
      },
      en: {
        // Dashboard
        globalScmDashboard: "Global SCM Dashboard",
        fulfillmentCenterManagement: "Overseas Fulfillment Center Management",
        inventoryStatus: "Inventory Status",
        outboundStatus: "Outbound Status",
        inboundSchedule: "Inbound Schedule",
        totalStock: "Total Stock",
        todayOutbound: "Today's Outbound",
        inboundScheduled: "Inbound Scheduled",
        vsYesterday: "vs Yesterday",
        next7Days: "Next 7 Days",
        
        // Inventory
        centerInventory: "Center Inventory Status",
        inventoryAlert: "Inventory Alerts",
        skuInventory: "SKU Inventory Status",
        availableStock: "Available",
        outboundReserved: "Outbound Reserved",
        channelReserved: "Channel Reserved",
        issueStock: "Issue Stock",
        country: "Country",
        center: "Center",
        productName: "Product Name",
        lotNumber: "Lot Number",
        expiryDate: "Expiry Date",
        status: "Status",
        normal: "Normal",
        shortage: "Shortage",
        searchPlaceholder: "Search by SKU or product name...",
        centerSearchPlaceholder: "Search by country or center name...",
        allCountries: "All Countries",
        allCenters: "All Centers",
        
        // Countries
        singapore: "Singapore",
        usa: "USA",
        korea: "Korea",
        
        // Centers
        sgMainCenter: "SG Main Center",
        usEastCenter: "US East Center",
        usWestCenter: "US West Center",
        
        // Alert messages
        inventoryShortage: "Inventory Shortage",
        currentStock: "Current Stock",
        shortageApproaching: "Shortage Approaching",
        outOfStockIn7Days: "Out of Stock in 7 Days",
        salesSurge: "Sales Surge",
        last7DaysVs: "Last 7 Days vs",
        
        // Outbound
        outboundAccept: "Outbound Accept",
        outboundComplete: "Outbound Complete",
        deliveryComplete: "Delivery Complete",
        totalOutbound: "Total Outbound",
        totalOf: "Total of",
        otherMarketplaces: "Other Marketplaces",
        avgProcessingTime: "Avg Processing Time",
        ownMall: "Own Mall",
        centerOutboundStatus: "Center Outbound Status",
        channelSalesStatus: "Channel Sales Status",
        skuOutboundDetails: "SKU Outbound Details",
        outboundQuantity: "Outbound Quantity",
        hourlyOutboundVolume: "Hourly Outbound Volume",
        channelOccupancyRate: "Channel Occupancy Rate",
        amazon: "Amazon",
        qoo10: "Qoo10",
        
        // Inbound
        thisWeekInbound: "This Week Inbound",
        delayedCount: "Delayed Count",
        completionRate: "Completion Rate",
        last30DaysBasis: "Last 30 Days Basis",
        inboundFlowStatus: "Inbound Flow Status",
        koreaSupplier: "Korea Supplier",
        chinaSupplier: "China Supplier",
        centerTransfer: "Center Transfer",
        destinationCenter: "Destination Center",
        inboundScheduledList: "Inbound Scheduled List",
        inboundId: "Inbound ID",
        inboundAlerts: "Inbound Alerts",
        inboundDelayed: "Inbound Delayed",
        scheduledDate: "Scheduled Date",
        currentDelay: "Current Delay",
        arrivingTomorrow: "Arriving Tomorrow",
        prepare: "Prepare",
        inboundCompleted: "Inbound Complete",
        confirm: "Confirm",
        viewDetails: "View Details",
        
        // Time ranges
        oneDay: "1 Day",
        sevenDays: "7 Days",
        thirtyDays: "30 Days",
        ninetyDays: "90 Days",
        
        // Timezones
        koreaTimezone: "Korea (UTC+9)",
        singaporeTimezone: "Singapore (UTC+8)",
        usEastTimezone: "US East (UTC-5)",
        usWestTimezone: "US West (UTC-8)",
        utcTimezone: "UTC",
        
        // Common
        urgent: "Urgent",
        warning: "Warning",
        information: "Info",
        items: "items",
        processing: "Processing",
        completed: "Completed",
        pending: "Pending",
        cases: "cases",
        total: "Total",
        channels: "Channels",
        outbound: "Outbound",
        sku: "SKU",
        salesChannel: "Sales Channel",
        supplier: "Supplier",
        expectedDate: "Expected Date",
        totalQuantity: "Total Quantity",
        others: "Others",
        
        // Outbound specific
        outboundDelay: "Outbound Delay",
        delayedOutbound: "Delayed Outbound",
        deliveryDelay: "Delivery Delay",
        delayedDelivery: "Delayed Delivery",
        avgOutboundTime: "Avg Outbound Time",
        avgDeliveryTime: "Avg Delivery Time",
      },
      ja: {
        // Dashboard
        globalScmDashboard: "グローバルSCMダッシュボード",
        fulfillmentCenterManagement: "海外フルフィルメントセンター統合管理",
        inventoryStatus: "在庫状況",
        outboundStatus: "出荷状況",
        inboundSchedule: "入荷予定",
        totalStock: "総在庫",
        todayOutbound: "本日出荷",
        inboundScheduled: "入荷予定",
        vsYesterday: "前日比",
        next7Days: "今後7日間",
        
        // Inventory
        centerInventory: "センター別在庫状況",
        inventoryAlert: "在庫アラート",
        skuInventory: "SKU別在庫状況",
        availableStock: "販売可能",
        outboundReserved: "出荷予約",
        channelReserved: "チャネル予約",
        issueStock: "問題在庫",
        country: "国",
        center: "センター",
        productName: "商品名",
        lotNumber: "ロット番号",
        expiryDate: "有効期限",
        status: "状態",
        normal: "正常",
        shortage: "不足",
        searchPlaceholder: "SKUまたは商品名で検索...",
        centerSearchPlaceholder: "国またはセンター名で検索...",
        allCountries: "全ての国",
        allCenters: "全てのセンター",
        
        // Countries
        singapore: "シンガポール",
        usa: "アメリカ",
        korea: "韓国",
        
        // Centers
        sgMainCenter: "SGメインセンター",
        usEastCenter: "US東部センター",
        usWestCenter: "US西部センター",
        
        // Alert messages
        inventoryShortage: "在庫不足",
        currentStock: "現在在庫",
        shortageApproaching: "在庫不足に近い",
        outOfStockIn7Days: "7日後に品切れ予測",
        salesSurge: "販売量急増",
        last7DaysVs: "前7日比",
        
        // Outbound
        outboundAccept: "出荷受付",
        outboundComplete: "出荷完了",
        deliveryComplete: "配送完了",
        totalOutbound: "総出荷",
        totalOf: "全体の",
        otherMarketplaces: "その他のマーケットプレイス",
        avgProcessingTime: "平均処理時間",
        ownMall: "自社モール",
        centerOutboundStatus: "センター別出荷状況",
        channelSalesStatus: "チャネル販売状況",
        skuOutboundDetails: "SKU出荷詳細",
        outboundQuantity: "出荷量",
        hourlyOutboundVolume: "時間帯別出荷量",
        channelOccupancyRate: "チャネル占有率",
        amazon: "Amazon",
        qoo10: "Qoo10",
        
        // Inbound
        thisWeekInbound: "今週の入荷",
        delayedCount: "遅延件数",
        completionRate: "完了率",
        last30DaysBasis: "過去30日基準",
        inboundFlowStatus: "入荷フロー状況",
        koreaSupplier: "韓国サプライヤー",
        chinaSupplier: "中国サプライヤー",
        centerTransfer: "センター間移動",
        destinationCenter: "目的地センター",
        inboundScheduledList: "入荷予定リスト",
        inboundId: "入荷ID",
        inboundAlerts: "入荷関連アラート",
        inboundDelayed: "入荷遅延",
        scheduledDate: "予定日",
        currentDelay: "現在遅延",
        arrivingTomorrow: "明日到着予定",
        prepare: "準備",
        inboundCompleted: "入荷完了",
        confirm: "確認",
        viewDetails: "詳細を見る",
        
        // Time ranges
        oneDay: "1日",
        sevenDays: "7日",
        thirtyDays: "30日",
        ninetyDays: "90日",
        
        // Timezones
        koreaTimezone: "韓国 (UTC+9)",
        singaporeTimezone: "シンガポール (UTC+8)",
        usEastTimezone: "アメリカ東部 (UTC-5)",
        usWestTimezone: "アメリカ西部 (UTC-8)",
        utcTimezone: "UTC",
        
        // Common
        urgent: "緊急",
        warning: "注意",
        information: "情報",
        items: "個",
        processing: "処理中",
        completed: "完了",
        pending: "待機",
        cases: "件",
        total: "全体",
        channels: "チャネル",
        outbound: "出荷",
        sku: "SKU",
        salesChannel: "販売チャネル",
        supplier: "サプライヤー",
        expectedDate: "予定日",
        totalQuantity: "総数量",
        others: "その他",
        
        // Outbound specific
        outboundDelay: "出荷遅延",
        delayedOutbound: "遅延出荷",
        deliveryDelay: "配送遅延",
        delayedDelivery: "遅延配送",
        avgOutboundTime: "平均出荷時間",
        avgDeliveryTime: "平均配送時間",
      },
    };
    return texts[selectedLanguage as keyof typeof texts]?.[key as keyof typeof texts.ko] || texts.ko[key as keyof typeof texts.ko];
  };

  // Format date according to selected timezone and language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: selectedTimezone,
    };
    
    const locale = selectedLanguage === 'ko' ? 'ko-KR' : 
                   selectedLanguage === 'ja' ? 'ja-JP' : 'en-US';
    
    return date.toLocaleDateString(locale, options);
  };

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    selectedTimezone,
    setSelectedTimezone,
    getText,
    formatDate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 