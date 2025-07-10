import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, TruckIcon, ArrowUpIcon, Filter, Globe, Building, Calendar, Warehouse, Search, AlertTriangle, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";



export const InventoryOverview = () => {
  const { getText, formatDate } = useApp();
  const [expandedCenters, setExpandedCenters] = useState<string[]>([]);
  const [skuSearchTerm, setSkuSearchTerm] = useState("");
  const [centerSearchTerm, setCenterSearchTerm] = useState("");
  const [localSelectedCenter, setLocalSelectedCenter] = useState("all");
  const [localSelectedCountry, setLocalSelectedCountry] = useState("all");

  const countries = [
    { value: "all", label: getText("allCountries") },
    { value: "SG", label: getText("singapore") },
    { value: "US", label: getText("usa") },
    { value: "KR", label: getText("korea") },
  ];

  const centers = [
    { value: "all", label: getText("allCenters") },
    { value: "SG-01", label: getText("sgMainCenter") },
    { value: "US-01", label: getText("usEastCenter") },
    { value: "US-02", label: getText("usWestCenter") },
  ];

  const inventoryData = [
    {
      country: getText("singapore"),
      center: "SG-01",
      totalStock: 578250,
      availableStock: 456780,
      outboundReserved: 45230,
      channelReserved: 44240,
      issueStock: 32000,
      utilizationRate: 78,
      skus: [
        { sku: "ABC-001", productName: "스마트폰 케이스", totalStock: 8900, availableStock: 7200, outboundReserved: 1200, channelReserved: 500, issueStock: 0, lotNumber: "LOT-2024-001", expiryDate: "2025-12-31" },
        { sku: "DEF-002", productName: "무선 이어폰", totalStock: 12300, availableStock: 10500, outboundReserved: 1200, channelReserved: 600, issueStock: 0, lotNumber: "LOT-2024-003", expiryDate: "2026-06-30" },
      ]
    },
    {
      country: getText("usa"),
      center: "US-01",
      totalStock: 456890,
      availableStock: 389670,
      outboundReserved: 34120,
      channelReserved: 22100,
      issueStock: 11000,
      utilizationRate: 85,
      skus: [
        { sku: "ABC-001", productName: "스마트폰 케이스", totalStock: 6778, availableStock: 5200, outboundReserved: 878, channelReserved: 700, issueStock: 0, lotNumber: "LOT-2024-002", expiryDate: "2025-11-30" },
        { sku: "GHI-003", productName: "충전 케이블", totalStock: 20678, availableStock: 18900, outboundReserved: 1278, channelReserved: 500, issueStock: 0, lotNumber: "LOT-2024-004", expiryDate: "2027-03-15" },
      ]
    },
    {
      country: getText("usa"),
      center: "US-02",
      totalStock: 249420,
      availableStock: 198340,
      outboundReserved: 28080,
      channelReserved: 17000,
      issueStock: 6000,
      utilizationRate: 72,
      skus: [
        { sku: "DEF-002", productName: "무선 이어폰", totalStock: 11156, availableStock: 9500, outboundReserved: 1156, channelReserved: 500, issueStock: 0, lotNumber: "LOT-2024-005", expiryDate: "2026-08-20" },
      ]
    },
  ];

  const allSkuData = [
    {
      sku: "ABC-001",
      productName: "스마트폰 케이스",
      totalStock: 15678,
      availableStock: 12400,
      outboundReserved: 2078,
      channelReserved: 1200,
      issueStock: 0,
      lotNumber: "LOT-2024-001",
      expiryDate: "2025-12-31",
      status: getText("normal"),
      center: "SG-01",
      country: getText("singapore"),
    },
    {
      sku: "DEF-002", 
      productName: "무선 이어폰",
      totalStock: 23456,
      availableStock: 20000,
      outboundReserved: 2356,
      channelReserved: 1100,
      issueStock: 0,
      lotNumber: "LOT-2024-003",
      expiryDate: "2026-06-30",
      status: getText("shortage"),
      center: "US-01",
      country: getText("usa"),
    },
    {
      sku: "GHI-003",
      productName: "충전 케이블",
      totalStock: 45678,
      availableStock: 41900,
      outboundReserved: 2778,
      channelReserved: 1000,
      issueStock: 0,
      lotNumber: "LOT-2024-004",
      expiryDate: "2027-03-15",
      status: getText("normal"),
      center: "US-02",
      country: getText("usa"),
    },
  ];

  const toggleCenterExpansion = (centerKey: string) => {
    setExpandedCenters(prev => 
      prev.includes(centerKey) 
        ? prev.filter(key => key !== centerKey)
        : [...prev, centerKey]
    );
  };

  const filteredSkuData = allSkuData.filter(item => {
    // Search filter (SKU or product name)
    const searchMatch = skuSearchTerm === "" || 
      item.sku.toLowerCase().includes(skuSearchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(skuSearchTerm.toLowerCase());
    
    // Country filter - compare with country labels
    const countryMatch = localSelectedCountry === "all" || 
      (localSelectedCountry === "SG" && item.country === getText("singapore")) ||
      (localSelectedCountry === "US" && item.country === getText("usa")) ||
      (localSelectedCountry === "KR" && item.country === getText("korea"));
    
    // Center filter
    const centerMatch = localSelectedCenter === "all" || 
      item.center === localSelectedCenter;
    
    return searchMatch && countryMatch && centerMatch;
  });

  const filteredInventoryData = inventoryData.filter(data => 
    data.country.toLowerCase().includes(centerSearchTerm.toLowerCase()) ||
    data.center.toLowerCase().includes(centerSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Country/Center Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="w-5 h-5" />
              {getText("centerInventory")}
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={getText("centerSearchPlaceholder")}
                value={centerSearchTerm}
                onChange={(e) => setCenterSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInventoryData.map((data, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-semibold">{data.country} - {data.center}</h4>
                      <p className="text-sm text-muted-foreground">{getText("totalStock")}: {data.totalStock.toLocaleString()}{getText("items")}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div className="text-center p-2 bg-inventory-available/10 rounded">
                      <div className="font-semibold text-inventory-available">{data.availableStock.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{getText("availableStock")}</div>
                    </div>
                    <div className="text-center p-2 bg-inventory-reserved/10 rounded">
                      <div className="font-semibold text-inventory-reserved">{data.outboundReserved.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{getText("outboundReserved")}</div>
                    </div>
                    <div className="text-center p-2 bg-inventory-reserved/10 rounded">
                      <div className="font-semibold text-inventory-reserved">{data.channelReserved.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{getText("channelReserved")}</div>
                    </div>
                    <div className="text-center p-2 bg-inventory-issue/10 rounded">
                      <div className="font-semibold text-inventory-issue">{data.issueStock.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{getText("issueStock")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {getText("inventoryAlert")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <div className="flex-1">
                  <p className="text-sm font-medium">SKU DEF-002 {getText("inventoryShortage")}</p>
                  <p className="text-xs text-muted-foreground">US-01 {getText("center")}, {getText("currentStock")}: 156{getText("items")}</p>
                </div>
                <Badge variant="destructive">{getText("urgent")}</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">ABC-001 {getText("shortageApproaching")}</p>
                  <p className="text-xs text-muted-foreground">SG-01 {getText("center")}, {getText("outOfStockIn7Days")}</p>
                </div>
                <Badge variant="outline">{getText("warning")}</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-info/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-info" />
                <div className="flex-1">
                  <p className="text-sm font-medium">ABC-001 {getText("salesSurge")}</p>
                  <p className="text-xs text-muted-foreground">{getText("last7DaysVs")} +45%</p>
                </div>
                <Badge variant="secondary">{getText("information")}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SKU Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {getText("skuInventory")}
          </CardTitle>
          <Separator />

          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-3">
              <Select value={localSelectedCountry} onValueChange={setLocalSelectedCountry}>
                <SelectTrigger className="w-40">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getText("allCountries")}</SelectItem>
                  {countries.slice(1).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={localSelectedCenter} onValueChange={setLocalSelectedCenter}>
                <SelectTrigger className="w-40">
                  <Building className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getText("allCenters")}</SelectItem>
                  {centers.slice(1).map((center) => (
                    <SelectItem key={center.value} value={center.value}>
                      {center.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={getText("searchPlaceholder")}
                value={skuSearchTerm}
                onChange={(e) => setSkuSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{getText("country")}</TableHead>
                <TableHead>{getText("center")}</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>{getText("productName")}</TableHead>
                <TableHead className="text-right">{getText("totalStock")}</TableHead>
                <TableHead className="text-right">{getText("availableStock")}</TableHead>
                <TableHead className="text-right">{getText("outboundReserved")}</TableHead>
                <TableHead className="text-right">{getText("channelReserved")}</TableHead>
                <TableHead className="text-right">{getText("issueStock")}</TableHead>
                <TableHead>{getText("lotNumber")}</TableHead>
                <TableHead>{getText("expiryDate")}</TableHead>
                <TableHead>{getText("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSkuData.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.center}</TableCell>
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.totalStock.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-inventory-available">
                    {item.availableStock.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-inventory-reserved">
                    {item.outboundReserved.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-inventory-reserved">
                    {item.channelReserved.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-inventory-issue">
                    {item.issueStock.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.lotNumber}</TableCell>
                  <TableCell className="text-sm">{formatDate(item.expiryDate)}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === getText("normal") ? "secondary" : "destructive"}>
                      {item.status === getText("normal") ? getText("normal") : getText("shortage")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};