import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  table: {
    display: 'flex',
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 25,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subjectContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  feedback: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  feedbackText: {
    fontSize: 10,
    color: '#444',
    lineHeight: 1.4,
  }
});

interface ResultsPDFProps {
  examName: string;
  departmentName: string;
  studentName: string;
  subjects: Array<{
    subject: {
      subject_name: string;
      subject_type: string;
    };
    marks: {
      marks_obtained: number;
      status: string;
      feedback_summary: string;
    };
  }>;
  stats: {
    total: number;
    maxTotal: number;
    percentage: number;
    highest: number;
    lowest: number;
  };
}

export const ResultsPDF = ({ 
  examName, 
  departmentName,
  studentName,
  subjects,
  stats 
}: ResultsPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Examination Results</Text>
        <Text style={styles.subtitle}>{examName}</Text>
        <Text style={styles.subtitle}>Department: {departmentName}</Text>
        <Text style={styles.subtitle}>Student: {studentName}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Score</Text>
          <Text style={styles.statValue}>{stats.total}/{stats.maxTotal}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Percentage</Text>
          <Text style={styles.statValue}>{stats.percentage}%</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Highest</Text>
          <Text style={styles.statValue}>{stats.highest}/100</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Lowest</Text>
          <Text style={styles.statValue}>{stats.lowest}/100</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subject-wise Results</Text>
        {subjects.map((item, index) => (
          <View key={index} style={styles.subjectContainer}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text>{item.subject.subject_name}</Text>
                <Text style={{ fontSize: 8, color: '#666' }}>{item.subject.subject_type}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.marks.marks_obtained}/100</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.marks.status?.replace('_', ' ').toUpperCase() || 'PENDING'}</Text>
              </View>
            </View>
            <View style={styles.feedback}>
              <Text style={styles.feedbackText}>
                <Text style={{ fontWeight: 'bold' }}>Overall Feedback:</Text>
                {'\n\n'}
                {item.marks.feedback_summary}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);