
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { DayType, CalendarDay } from '../types/types';

// Register a nice font (optional, using Helvetica by default is fine for now)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 5,
    },
    headerLeft: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 10,
        color: '#6B7280',
        marginTop: 4,
    },
    logo: {
        width: 100,
        height: 'auto',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#31381cff',
        marginBottom: 8,
        marginTop: 10,
        textTransform: 'uppercase',
    },
    configGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
        backgroundColor: '#F3F4F6',
        padding: 8,
        borderRadius: 4,
    },
    configItem: {
        width: '33%',
        marginBottom: 5,
    },
    configLabel: {
        fontSize: 8,
        color: '#041e26ff',
        textTransform: 'uppercase',
    },
    configValue: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    monthContainer: {
        width: '24%',
        marginBottom: 4,
        borderWidth: 0.5,
        borderColor: '#9fa0a4ff',
        borderRadius: 2,
        padding: 2,
    },
    monthTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
        color: '#090909ff',
        backgroundColor: '#c0c0c0ff',
        padding: 2,
    },
    weekHeader: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    dayHeader: {
        width: '14.28%',
        fontSize: 6,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#e8e7e7ff',
        color: '#060606ff',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },
    dayText: {
        fontSize: 7,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendBox: {
        width: 10,
        height: 10,
        marginRight: 4,
        borderRadius: 2,
    },
    legendText: {
        fontSize: 8,
        color: '#000000ff',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#9CA3AF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 10,
    },
    developedBy: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    devText: {
        fontSize: 8,
        color: '#6B7280',
        marginRight: 5
    },
    devLogo: {
        width: 60,
        height: 'auto'
    }
});

interface PDFDocumentProps {
    startDate: string;
    workDays: number;
    restDays: number;
    departureDay: string;
    returnDay: string;
    monthsData: any[]; // We will pass the processed months data here
    logoUrl?: string; // Optional logo URL if we want to pass a base64 or static asset
}

const PDFDocument: React.FC<PDFDocumentProps> = ({
    startDate,
    workDays,
    restDays,
    departureDay,
    returnDay,
    monthsData,
    logoUrl
}) => (
    <Document>
        <Page size="A4" style={styles.page} orientation="landscape">
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>Cronograma de Viajes</Text>
                    <Text style={styles.subtitle}>Planificador Inteligente de Ciclos</Text>
                </View>
                {/* We create a simple branding section if no logo is provided or as text */}
                <View style={styles.developedBy}>
                    <Text style={styles.devText}>Desarrollado por: Dionny Nuñez</Text>
                </View>
            </View>

            {/* Configuration Summary */}
            <View style={styles.configGrid}>
                <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Inicio de Ciclo</Text>
                    <Text style={styles.configValue}>{startDate}</Text>
                </View>
                <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Días de Trabajo</Text>
                    <Text style={styles.configValue}>{workDays} días</Text>
                </View>
                <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Días de Descanso</Text>
                    <Text style={styles.configValue}>{restDays} días</Text>
                </View>
                <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Día de Salida</Text>
                    <Text style={styles.configValue}>{departureDay}</Text>
                </View>
                <View style={styles.configItem}>
                    <Text style={styles.configLabel}>Día de Regreso</Text>
                    <Text style={styles.configValue}>{returnDay}</Text>
                </View>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
                {monthsData.map((month: any, index: number) => (
                    <View key={index} style={styles.monthContainer}>
                        <Text style={styles.monthTitle}>{month.name} {month.year}</Text>

                        {/* Week Days Header */}
                        <View style={styles.weekHeader}>
                            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                                <Text key={i} style={styles.dayHeader}>{d}</Text>
                            ))}
                        </View>

                        {/* Days */}
                        <View style={styles.daysGrid}>
                            {/* Empty cells for start of month */}
                            {Array.from({ length: month.startDay }).map((_, i) => (
                                <View key={`empty-${i}`} style={styles.dayCell} />
                            ))}

                            {/* Actual days */}
                            {month.days.map((day: any, i: number) => {
                                let bg = '#FFFFFF';
                                let color = '#111827';
                                let fontWeight: any = 'normal';

                                if (day.type === DayType.Work) {
                                    bg = '#dbe2ffff'; // Indigo 50
                                    color = '#0c00f4ff'; // Indigo 600
                                } else if (day.type === DayType.Rest) {
                                    bg = '#cfffe9ff'; // Emerald 50
                                    color = '#009b3bff'; // Emerald 600
                                } else if (day.type === DayType.Departure) {
                                    bg = '#2563EB'; // Blue 600
                                    color = '#FFFFFF';
                                    fontWeight = 'bold';
                                } else if (day.type === DayType.Return) {
                                    bg = '#7C3AED'; // Violet 600
                                    color = '#FFFFFF';
                                    fontWeight = 'bold';
                                }

                                return (
                                    <View key={i} style={[styles.dayCell, { backgroundColor: bg }]}>
                                        <Text style={[styles.dayText, { color: color, fontWeight: fontWeight }]}>
                                            {day.day}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, { backgroundColor: '#7490edff' }]} />
                    <Text style={styles.legendText}>Días de Trabajo</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, { backgroundColor: '#4cec8fff' }]} />
                    <Text style={styles.legendText}>Días de Descanso</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, { backgroundColor: '#2563EB' }]} />
                    <Text style={styles.legendText}>Día de Salida</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, { backgroundColor: '#7C3AED' }]} />
                    <Text style={styles.legendText}>Día de Regreso</Text>
                </View>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                Generado automáticamente por CityNy Development - {new Date().toLocaleDateString()}
            </Text>
        </Page>
    </Document>
);

export default PDFDocument;
