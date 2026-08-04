import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import ApiService from '../../../services/ApiService';
import ChildCare from '../../../models/childcare';
import AdminTaskBar from '../AdminTaskBar/AdminTaskBar';

const CHILDCARE_ICONS = ["🏡", "🌳", "🌻", "🎨", "🌈", "🦋"];
const CARD_COLORS = ["#e0f5f0", "#fff0d8", "#fce7f3", "#e0f2fe", "#f0e8ff", "#fef9c3"];

export default function ManageChildCareWeb({ navigation }: { navigation: any }) {
  const [childcares, setChildcares] = useState<ChildCare[]>([]);

  useEffect(() => {
    ApiService.GetChildCares()
      .then(res => { if (res.success === true) setChildcares(res.data); })
      .catch(() => setChildcares([]));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AdminTaskBar navigation={navigation} activeKey='utilisateurs' />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} style={{ backgroundColor: "#f5f6fa", flex: 1 }}>
        <View style={{ padding: 24, maxWidth: 1200, width: "100%", alignSelf: "center" }}>

        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <View>
            <Text style={{ fontSize: 26, fontWeight: "800", color: "#0f172a" }}>Gestion des creches</Text>
            <Text style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Creer, consulter et piloter les etablissements.</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateChildCare")}
            style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: "#2A9D8F" }}
            activeOpacity={0.85}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>+ Ajouter une creche</Text>
          </TouchableOpacity>
        </View>

        {/* Childcare cards */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          {childcares.length === 0 && <Text style={{ color: "#94a3b8", fontSize: 14 }}>Aucun etablissement enregistre.</Text>}
          {childcares.map((item, idx) => (
            <View key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 24, minWidth: 280, flex: 1, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
              {/* Icon */}
              <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: CARD_COLORS[idx % CARD_COLORS.length], alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Text style={{ fontSize: 26 }}>{CHILDCARE_ICONS[idx % CHILDCARE_ICONS.length]}</Text>
              </View>
              <Text style={{ fontSize: 18, fontWeight: "800", color: "#0f172a", marginBottom: 4 }}>{item.name}</Text>
              <View style={{ gap: 4, marginBottom: 18 }}>
                {item.address ? <Text style={{ fontSize: 12, color: "#64748b" }}>📍 {item.address}</Text> : null}
                {item.email ? <Text style={{ fontSize: 12, color: "#64748b" }}>📧 {item.email}</Text> : null}
                {item.phoneNumber ? <Text style={{ fontSize: 12, color: "#64748b" }}>📞 {item.phoneNumber}</Text> : null}
              </View>
              {/* Actions */}
              <View style={{ borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 14, gap: 8 }}>
                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                  <Pressable onPress={() => navigation.navigate("CreateEducator", { childcareId: item.id })}
                    style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, backgroundColor: "#e0f5f0" }}>
                    <Text style={{ color: "#1F8A70", fontWeight: "600", fontSize: 12 }}>+ Educatrice</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate("CreateParent", { childcareId: item.id })}
                    style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, backgroundColor: "#fff0d8" }}>
                    <Text style={{ color: "#92400e", fontWeight: "600", fontSize: 12 }}>+ Parent</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate("CreateChild", { childcareId: item.id })}
                    style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, backgroundColor: "#fce7f3" }}>
                    <Text style={{ color: "#9d174d", fontWeight: "600", fontSize: 12 }}>+ Enfant</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate("ManageRoom", { childcareId: item.id })}
                    style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, backgroundColor: "#e0f2fe" }}>
                    <Text style={{ color: "#0369a1", fontWeight: "600", fontSize: 12 }}>Locaux</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Stats */}
          <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
            <View style={{ flex: 1, minWidth: 200, backgroundColor: "#2A9D8F", borderRadius: 16, padding: 24 }}>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", letterSpacing: 1, marginBottom: 8 }}>TOTAL CRECHES</Text>
              <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800" }}>{childcares.length}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



